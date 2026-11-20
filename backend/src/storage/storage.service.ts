import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private supabase: SupabaseClient | null = null;
  private readonly defaultBucket: string;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const supabaseUrl = this.config.get<string>('SUPABASE_URL');
    const serviceRoleKey = this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY');
    this.defaultBucket = this.config.get<string>('SUPABASE_STORAGE_BUCKET') || 'bugrefinery-uploads';

    if (supabaseUrl && serviceRoleKey) {
      this.supabase = createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false },
      });
      this.logger.log(`Supabase Storage client initialized for bucket "${this.defaultBucket}"`);
    } else {
      this.logger.warn('Supabase credentials not configured. File operations run in fallback mode.');
    }
  }

  async uploadFile(
    fileBuffer: Buffer,
    filename: string,
    mimeType: string,
    userId?: string,
    bucket = this.defaultBucket,
  ) {
    const safeName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const storagePath = `uploads/${safeName}`;

    if (this.supabase) {
      const { error } = await this.supabase.storage
        .from(bucket)
        .upload(storagePath, fileBuffer, {
          contentType: mimeType,
          upsert: false,
        });

      if (error) {
        this.logger.error(`Supabase upload error: ${error.message}`);
        throw new Error(`Upload failed: ${error.message}`);
      }
    }

    // Record document in Prisma
    try {
      const doc = await this.prisma.document.create({
        data: {
          filename,
          storagePath,
          fileSize: fileBuffer.length,
          mimeType,
          uploadedBy: userId || null,
        },
      });
      return { success: true, path: storagePath, documentId: doc.id };
    } catch {
      return { success: true, path: storagePath, documentId: null };
    }
  }

  async getFileUrl(path: string, bucket = this.defaultBucket, expiresIn = 3600) {
    if (!this.supabase) {
      return { url: `/mock-storage/${path}`, signed: false };
    }

    const { data, error } = await this.supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error || !data?.signedUrl) {
      // Fallback to public URL
      const { data: publicData } = this.supabase.storage.from(bucket).getPublicUrl(path);
      return { url: publicData.publicUrl, signed: false };
    }

    return { url: data.signedUrl, signed: true };
  }

  async deleteFile(path: string, bucket = this.defaultBucket) {
    if (this.supabase) {
      await this.supabase.storage.from(bucket).remove([path]);
    }
    await this.prisma.document.deleteMany({ where: { storagePath: path } });
    return { success: true };
  }
}
