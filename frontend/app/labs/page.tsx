import React from 'react';
import { LabsCatalog } from '@/components/landing/LabsCatalog';

export const metadata = {
  title: 'Industry Simulation Labs | Bug Refinery',
  description: 'Explore 26 industry-simulation labs across Tech, Management, Engineering, and Medical.',
};

export default function LabsPage() {
  return (
    <div className="pt-24 pb-16">
      <LabsCatalog />
    </div>
  );
}
