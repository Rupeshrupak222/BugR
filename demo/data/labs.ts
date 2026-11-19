// Public source snapshot: 2026-11-04. See CONTENT_SOURCES.md.
// Display names follow BRD v1.0; paths and curriculum are taken from the live pages.
export const labContent = [
  {
    "name": "Python Full Stack",
    "sourceTitle": "Python Full Stack",
    "slug": "python-full-stack",
    "path": "/labs/python-full-stack.html",
    "domain": "tech",
    "artwork": "product",
    "simulate": "Django + React product, buggy tickets, code reviews, sprints.",
    "summaryProof": "Deployed product, reviewed PRs, debugging score.",
    "bug": "theory-strong graduates who cannot debug a Django/React app or ship a feature.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Django models, views, URLs, and the admin — reading and fixing a starter app.",
          "Django ORM queries, migrations, and common query mistakes.",
          "React components, props, state, and hooks — fixing a broken form and a stale list.",
          "REST APIs with Django REST Framework: serializers, status codes, and error responses.",
          "Git branching, commits, and pull requests; reading stack traces and browser / server logs.",
          "Authentication basics: sessions, tokens, and protected routes."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "Git, Django shell, browser DevTools, pytest, PostgreSQL / SQLite logs.",
        "items": [
          "BUG #1: Login API returns 500 for valid users — trace the traceback, find the broken serializer field, fix it, add a regression test.",
          "BUG #2: Auth token refresh fails after expiry — reproduce, fix the refresh flow, prove old and new tokens behave correctly.",
          "BUG #3: A list page slows to seconds — find the N+1 query, fix it with select_related / prefetch_related, show before/after query counts.",
          "BUG #4: React state bug loses form data on navigation — reproduce, fix state handling, verify no data loss on back/forward."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Trace a user request end-to-end (React → API → Django view → ORM → database → response) in a large legacy Django + React codebase with incomplete docs, and document the flow.",
          "Refactor one messy module (split a god view, rename misleading variables, extract a helper) without changing behaviour; all existing tests must still pass.",
          "Add a new feature (e.g. search + filter + pagination) in unfamiliar code, with tests and a reviewed pull request.",
          "Review a peer's pull request: find at least one real defect, one missing test, and one readability issue."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone sprint — build and deploy a full product with auth, CRUD, API, and frontend; write a README, demo it live, and present a post-mortem of one bug found during the sprint.",
        "items": []
      }
    ],
    "proof": "live-deployed product URL, GitHub repo with reviewed pull requests, a regression-test report, and a one-page fix report for the capstone bug.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/python-full-stack.html",
    "sourceSha256": "461cf395f6be10b54a52617a07de6d8520259669bddb834252a2583735093e87"
  },
  {
    "name": "Java Full Stack",
    "sourceTitle": "Java Full Stack",
    "slug": "java-full-stack",
    "path": "/labs/java-full-stack.html",
    "domain": "tech",
    "artwork": "services",
    "simulate": "Broken backend services, API failures, database issues.",
    "summaryProof": "Deployed full-stack application.",
    "bug": "Java graduates who know syntax but cannot fix a Spring Boot service in production.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Java OOP, collections, and exception handling applied to real service code.",
          "Spring Boot controllers, services, and repositories; dependency injection.",
          "JPA entities, relationships, and transaction basics.",
          "REST API design: request/response, validation, and error codes.",
          "Maven/Gradle builds, Git, and reading application logs.",
          "Frontend basics for a full-stack app: forms, API calls, and rendering lists."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "IntelliJ/Eclipse, Spring logs, Postman, JUnit, database console.",
        "items": [
          "BUG #1: Service crashes on startup — find the misconfigured bean / property, fix it, prove a clean boot.",
          "BUG #2: JPA transaction rollback bug loses an order — reproduce, fix transaction boundaries, add a test.",
          "BUG #3: API timeout under a large payload — find the slow query / loop, fix it, show before/after timing.",
          "BUG #4: Null handling breaks a payment flow — find the null path, add validation and a safe fallback, test edge cases."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Trace a request through controllers, services, and database in a monolith; draw the call flow.",
          "Refactor a duplicated service method safely, with tests covering both old callers.",
          "Add a new endpoint (validation, service logic, persistence, tests) in unfamiliar code, reviewed by a mentor.",
          "Debug a failing integration test: decide whether the fault is in app code, test data, or configuration."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — deploy a Java full-stack application with API documentation, a demo, and a test report.",
        "items": []
      }
    ],
    "proof": "deployed Java application URL, API documentation, source repo with tests, and a test report showing pass/fail before and after fixes.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/java-full-stack.html",
    "sourceSha256": "e8d52be1cc7dad53ac43c88cd2d36c1c7499cd04cea5f9333eb12507d17ef89a"
  },
  {
    "name": "Selenium Testing",
    "sourceTitle": "Selenium Testing",
    "slug": "selenium-testing",
    "path": "/labs/selenium-testing.html",
    "domain": "tech",
    "artwork": "tests",
    "simulate": "Reproduce reported bugs, fix a flaky test suite, automate regression.",
    "summaryProof": "Stable automation suite + bug reports.",
    "bug": "testers who write scripts but cannot reproduce or stabilise real failures.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Selenium WebDriver locators: id, CSS, XPath, and when each breaks.",
          "Explicit vs implicit waits, and flakiness caused by timing.",
          "Page Object Model structure for a maintainable suite.",
          "TestNG/JUnit basics, assertions, and test data setup.",
          "Reading application logs and screenshots to reproduce a failure.",
          "Writing a clear bug report: steps, expected vs actual, evidence."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "Selenium WebDriver, TestNG/JUnit, browser DevTools, Git.",
        "items": [
          "BUG #1: Reproduce a reported checkout bug from a ticket with incomplete steps — record exact reproduction steps and evidence.",
          "BUG #2: Fix a flaky suite that fails 1 in 5 runs — find the timing / data cause, stabilise it, show 10 consecutive clean runs.",
          "BUG #3: Repair broken selectors after a UI change — update locators to stable ones, not brittle absolute XPaths.",
          "BUG #4: Triage 10 failures and classify each as app bug, test bug, or environment/data issue, with evidence."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Navigate a large test suite plus the application codebase; for each failure, decide app code vs test code vs data.",
          "Refactor a duplicated, hard-to-maintain suite into Page Objects with shared helpers.",
          "Add regression coverage for a previously escaped bug, with data setup that does not leak between tests.",
          "Review a peer's test code for false positives, missing assertions, and brittle locators."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a stable automation suite for a real application flow, with a bug report pack and an execution summary.",
        "items": []
      }
    ],
    "proof": "automation suite repo, execution report (10 clean runs), and a bug report pack with reproduction evidence for each bug found.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/selenium-testing.html",
    "sourceSha256": "492f4adf7edc4faa21c4f1c340a0eef22707cab384584fa9751f3e708c61f708"
  },
  {
    "name": "Data Analytics",
    "sourceTitle": "Data Analytics",
    "slug": "data-analytics",
    "path": "/labs/data-analytics.html",
    "domain": "tech",
    "artwork": "dashboard",
    "simulate": "Dirty datasets, broken dashboards, wrong metrics.",
    "summaryProof": "Clean, decision-ready dashboard.",
    "bug": "analysts who know tools but cannot trust a dashboard built on dirty data.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "SQL: joins, aggregations, window functions, and common join mistakes.",
          "Excel: cleaning, lookup, pivot, and formula auditing.",
          "Power BI / dashboard basics: measures, filters, and chart choice.",
          "Data types, dates, and currency handling — where silent errors creep in.",
          "Exploratory analysis: distributions, outliers, and missing values.",
          "Writing a metric definition so two analysts get the same number."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "SQL, Excel, Power BI, a sample warehouse.",
        "items": [
          "BUG #1: Dashboard revenue is double-counted — find the fan-out join, fix it, reconcile to source totals.",
          "BUG #2: A KPI changed overnight with no business change — trace it to a date-filter / timezone error, fix it, document the cause.",
          "BUG #3: Duplicate rows inflate a count — find the duplicate key, deduplicate correctly, show before/after counts.",
          "BUG #4: Currency conversion is wrong for one region — find the rate / rounding error, fix it, verify against source."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Trace a metric definition to its source tables across a messy warehouse; document lineage in a data dictionary.",
          "Fix an upstream logic error (e.g. wrong status mapping) and prove downstream dashboards change correctly.",
          "Reconcile three reports that disagree on the same metric; explain which is right and why.",
          "Build a data-quality checklist (nulls, duplicates, ranges, freshness) and apply it to a new dataset."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a decision-ready dashboard answering a real business question, with a written insight note, limitations, and next actions.",
        "items": []
      }
    ],
    "proof": "dashboard link/file, cleaned dataset, a metric-definition document, and a one-page insight note with limitations stated.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/data-analytics.html",
    "sourceSha256": "712c0701e34ce4abc331a48ae4aece57904ecf82cd6ab4a617d9eeee3d222651"
  },
  {
    "name": "Data Engineering",
    "sourceTitle": "Data Engineering",
    "slug": "data-engineering",
    "path": "/labs/data-engineering.html",
    "domain": "tech",
    "artwork": "pipeline",
    "simulate": "Failing pipelines, duplicate / missing data, slow jobs.",
    "summaryProof": "Reliable, monitored pipeline.",
    "bug": "engineers who can write a pipeline once, but cannot keep one reliable.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Python for data: pandas basics, file and API ingestion.",
          "SQL for pipelines: staging tables, incremental loads, and upserts.",
          "Pipeline structure: extract, transform, load, and idempotency.",
          "Scheduling and orchestration basics; retries and failure handling.",
          "Schema basics: types, nullability, and schema evolution.",
          "Logging, monitoring, and reading pipeline logs."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "Python, SQL, Airflow-style scheduler / cron logs, a sample warehouse.",
        "items": [
          "BUG #1: Nightly job fails — read the log, find the bad record / connection error, fix and rerun idempotently.",
          "BUG #2: Duplicate records after a rerun — find the non-idempotent load, fix the upsert key, deduplicate history.",
          "BUG #3: Missing partition for one day — find the date / timezone bug, backfill correctly, verify row counts.",
          "BUG #4: Schema change breaks downstream — adapt the pipeline, version the schema, notify downstream with a change note."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Map lineage for an existing pipeline set: sources, transforms, destinations, dependencies.",
          "Make a schema change safely: update code, tests, and downstream expectations, with a rollback plan.",
          "Add monitoring and alerts (row-count, freshness, null-rate checks) to an unmonitored pipeline.",
          "Optimise a slow job: find the bottleneck (scan, join, or serial step) and show before/after runtime."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a reliable, monitored pipeline with data-quality checks, a runbook, and a failure drill (break it, recover it, document it).",
        "items": []
      }
    ],
    "proof": "pipeline code, monitoring dashboard / alert config, data-quality report, and a runbook including the failure-drill result.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/data-engineering.html",
    "sourceSha256": "c3b05d659e0e0e22367d2b12a15ffbcdaf72dd8ab2573277ffbaddfe2c73138c"
  },
  {
    "name": "AI / ML",
    "sourceTitle": "AI / ML",
    "slug": "ai-ml",
    "path": "/labs/ai-ml.html",
    "domain": "tech",
    "artwork": "neural",
    "simulate": "Broken models, data leakage, bad evaluation, AI features failing in production.",
    "summaryProof": "Debugged, evaluated model / AI feature, shipped with metrics.",
    "bug": "ML learners who can train a model on clean data, but cannot debug one in production.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Python, NumPy/pandas, and train/test splitting done correctly.",
          "Supervised learning basics: classification, regression, and baselines.",
          "Evaluation metrics: accuracy, precision, recall, F1, ROC-AUC, and when each misleads.",
          "Data preparation: missing values, encoding, scaling, and leakage risks.",
          "Overfitting vs underfitting, and simple validation (cross-validation).",
          "Model serving basics: inputs, outputs, versioning, and logging predictions."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "Python, scikit-learn, Jupyter, evaluation scripts, prediction logs.",
        "items": [
          "BUG #1: Model accuracy collapses on real inputs — find data leakage in training, retrain cleanly, show honest metrics.",
          "BUG #2: A model returns nonsense for one segment — find the data / feature bug for that segment, fix it, show segment metrics.",
          "BUG #3: Drift: performance drops over time — detect drift in inputs, diagnose the cause, propose a retraining trigger.",
          "BUG #4: An AI feature hallucinates / fails silently — add validation, fallback, and logging so failures are visible, not silent."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Trace a prediction to data, features, model version, and serving code in a training + serving codebase.",
          "Fix a feature bug without breaking serving: version the change, test old vs new behaviour, roll back cleanly.",
          "Audit a model for a hidden data problem (duplicates, label errors, sampled bias) and document the finding.",
          "Review a peer's evaluation: check for leakage, wrong metric choice, and test-set contamination."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — ship an evaluated AI feature with metrics, error analysis by segment, a monitoring note, and a demo on real-style inputs.",
        "items": []
      }
    ],
    "proof": "evaluated model / feature, a metrics report (overall + by segment), an error-analysis note, and a monitoring / retraining note.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/ai-ml.html",
    "sourceSha256": "63cdb743d320a8cce4fe7abb79cf8d397babb2717d941df95eee73a5226dcdd3"
  },
  {
    "name": "Data Science",
    "sourceTitle": "Data Science",
    "slug": "data-science",
    "path": "/labs/data-science.html",
    "domain": "tech",
    "artwork": "scatter",
    "simulate": "Messy datasets, misleading analysis, weak statistical models.",
    "summaryProof": "Validated analysis + model report.",
    "bug": "graduates who can run a notebook, but cannot defend an analysis.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Descriptive statistics: mean, median, spread, and why each can mislead.",
          "Python for analysis: pandas, plotting, and reproducible notebooks.",
          "Exploratory analysis: distributions, outliers, correlations, and missing data.",
          "Hypothesis testing basics and common misreadings (p-values, significance).",
          "Regression basics and residual checks.",
          "Writing an analysis so someone else can reproduce it: data, code, and assumptions."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "Python, Jupyter, SQL, plotting libraries.",
        "items": [
          "BUG #1: A chart claims a trend that disappears after cleaning — find the outlier / aggregation error, correct it, show both versions.",
          "BUG #2: A test is applied to the wrong data type / design — choose the correct test, rerun, explain the change.",
          "BUG #3: A biased sample drives a wrong conclusion — identify the sampling bias, reweight or resample correctly, state the limit.",
          "BUG #4: Missing data handled by silently dropping rows — compare methods, choose a defensible one, show the impact."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Reproduce someone else's notebook end-to-end from raw data; fix broken paths, versions, and undocumented steps.",
          "Correct an analysis that mixes correlation with causation; rewrite the conclusion with evidence limits.",
          "Audit a dataset for duplicates, label errors, and leakage before modelling.",
          "Present an analysis to a mentor as if to a non-technical stakeholder: one claim, one chart, one caveat."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a validated analysis + model report answering a real question, with methods, limitations, and next actions, presented live.",
        "items": []
      }
    ],
    "proof": "reproducible notebook, analysis report with methods and limitations, and a one-page executive summary.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/data-science.html",
    "sourceSha256": "9982ae77c426e2b1823b9ccbe52089a152d0222abd24f1f8e81e143482f387f3"
  },
  {
    "name": "Cloud and DevOps",
    "sourceTitle": "Cloud & DevOps",
    "slug": "cloud-devops",
    "path": "/labs/cloud-devops.html",
    "domain": "tech",
    "artwork": "deployment",
    "simulate": "Failed deployments, broken CI/CD, infra incidents.",
    "summaryProof": "Stable deployment with rollback.",
    "bug": "learners who know cloud terms, but cannot recover a failed deployment.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Linux basics: files, processes, logs, permissions, and SSH.",
          "Docker: images, containers, volumes, and networking basics.",
          "Cloud basics: compute, storage, networking, and IAM concepts.",
          "CI/CD basics: build, test, deploy stages, and environment variables.",
          "Git for infra: versioning config, reviewing config changes.",
          "Monitoring basics: metrics, logs, alerts, and health checks."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "Docker, a cloud console / CLI, CI logs, shell, monitoring dashboards.",
        "items": [
          "BUG #1: Deployment fails in CI — read the build log, find the dependency / config error, fix it, get a green build.",
          "BUG #2: App is up but returns errors after deploy — roll back safely, then find the bad config / migration, fix forward.",
          "BUG #3: Service outage from a misconfigured environment variable / port / secret — diagnose from logs, fix, verify health checks pass.",
          "BUG #4: Disk / resource exhaustion slows a service — find the cause (logs, cache, runaway process), remediate, add an alert."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Trace an outage through infrastructure-as-code, service configs, and logs; write a timeline.",
          "Fix a config change safely across dev/staging/prod with a rollback plan.",
          "Add monitoring and alerting to an unmonitored service (health, error rate, latency).",
          "Review a peer's infra change for security, cost, and blast-radius risks."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a stable deployment pipeline with rollback, monitoring, and an incident runbook; run a failure drill and document recovery time.",
        "items": []
      }
    ],
    "proof": "deployment pipeline config, monitoring/alert setup, incident runbook, and a failure-drill post-mortem with recovery steps.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/cloud-devops.html",
    "sourceSha256": "d149e92bc4a6510a3c46dab3b108cade95a52b96925e57d8aa6e3bd85dfbdbd7"
  },
  {
    "name": "Cyber Security",
    "sourceTitle": "Cyber Security",
    "slug": "cyber-security",
    "path": "/labs/cyber-security.html",
    "domain": "tech",
    "artwork": "shield",
    "simulate": "Security incidents, vulnerable code, alert triage.",
    "summaryProof": "Incident report + patched vulnerability.",
    "bug": "security learners who know threats in theory, but cannot triage a real alert.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Networking basics: TCP/IP, DNS, HTTP, ports, and firewalls.",
          "Common vulnerabilities: OWASP Top 10 concepts, injection, XSS, broken access control.",
          "Log reading: web, auth, and system logs; finding anomalies.",
          "Authentication and authorisation basics: passwords, sessions, MFA, least privilege.",
          "Security tools basics: scanners, Burp-style proxy concepts, and safe lab practice.",
          "Incident triage: severity, containment, evidence, and communication."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "log files, a vulnerable practice app, scanner output, browser DevTools.",
        "items": [
          "BUG #1: Phishing alert — triage the alert, check headers/links, decide true vs false positive, document actions.",
          "BUG #2: SQL injection in a login form — reproduce safely in the lab, fix with parameterised queries, verify the fix.",
          "BUG #3: Misconfigured access lets a low-privilege user see admin data — find the access-control flaw, fix it, test all roles.",
          "BUG #4: Suspicious logins — trace the pattern, contain the account, reset safely, and write an incident note."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Trace an attack path through logs and code to its entry point; write a timeline.",
          "Audit a small codebase for injection, XSS, and broken access control; rank findings by risk.",
          "Fix a vulnerability without breaking the feature, with regression tests.",
          "Review a peer's fix for completeness: is the root cause fixed, or only one symptom?"
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — an incident report + patched system, with a hardening checklist and a retest proving the vulnerability is closed.",
        "items": []
      }
    ],
    "proof": "incident report, patched code/config, retest evidence, and a hardening checklist.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/cyber-security.html",
    "sourceSha256": "12367fe81fd803c7fc5e3f7b5769ab3fdda7fb182edd033867e72ebc461af59a"
  },
  {
    "name": "UI/UX Design",
    "sourceTitle": "UI/UX Design",
    "slug": "ui-ux-design",
    "path": "/labs/ui-ux-design.html",
    "domain": "tech",
    "artwork": "wireframe",
    "simulate": "Broken user flows, confusing screens, usability bugs.",
    "summaryProof": "Redesigned flow + working prototype.",
    "bug": "designers who can make screens, but cannot fix a flow users fail on.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "UX basics: user goals, tasks, and flows; where users drop off.",
          "Figma basics: frames, components, auto-layout, and prototyping.",
          "Visual hierarchy, typography, spacing, and colour for readability.",
          "Usability heuristics and accessibility basics (contrast, focus, labels).",
          "Auditing a flow: task success, error states, and empty states.",
          "Presenting design decisions with evidence, not taste alone."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "Figma, usability task scripts, screen recordings / notes.",
        "items": [
          "BUG #1: Checkout flow loses users at payment — audit the flow, find the friction, redesign that step.",
          "BUG #2: A form produces constant errors — find the confusing labels / validation, redesign with clear errors and recovery.",
          "BUG #3: Mobile flow breaks on small screens — find layout / touch-target issues, fix responsively.",
          "BUG #4: Accessibility failures (contrast, focus order, missing labels) — audit, fix, verify with a checklist."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Trace a user journey across a live product and its design system; find inconsistencies between screens.",
          "Fix a flow consistently across all screens using shared components, not one-off patches.",
          "Run a small usability task with a peer: observe, note failures, prioritise fixes.",
          "Review a peer's redesign for consistency, accessibility, and task success."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a redesigned flow + working prototype, tested with a usability task, with before/after evidence.",
        "items": []
      }
    ],
    "proof": "working prototype, before/after flow comparison, and a usability test note with task results.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/ui-ux-design.html",
    "sourceSha256": "98c428d2e0c50a920204d247821a551189bf1835de414e52fc080d1584c6261f"
  },
  {
    "name": "App Development",
    "sourceTitle": "App Development",
    "slug": "app-development",
    "path": "/labs/app-development.html",
    "domain": "tech",
    "artwork": "mobile",
    "simulate": "App crashes, broken screens, performance issues.",
    "summaryProof": "Shipped app build.",
    "bug": "app learners who can build a demo screen, but cannot fix a crashing app.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Flutter / React Native basics: widgets/components, layout, and navigation.",
          "State management basics and why state bugs lose data.",
          "API calls, loading states, and error handling on mobile.",
          "Local storage and offline basics.",
          "Debugging on emulator / device: logs, crash reports, and reproduction.",
          "App structure: screens, services, and reusable components."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "Flutter / React Native toolchain, emulator, device logs, API mock / backend.",
        "items": [
          "BUG #1: App crashes on one screen — reproduce from a crash log, find the null / state cause, fix it.",
          "BUG #2: List scrolls slowly / freezes — find the rendering / data cause, optimise, show before/after performance.",
          "BUG #3: API failure leaves a blank screen — add loading, error, and retry states, test offline and slow-network cases.",
          "BUG #4: Form data lost on rotation / navigation — fix state persistence, verify across navigation paths."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Navigate an app codebase: state, navigation, and API layers; trace a bug across layers.",
          "Add a feature across multiple screens without regressions, with manual test cases.",
          "Refactor duplicated screen code into shared components safely.",
          "Review a peer's app change for crash risks, state bugs, and missing error states."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — an app build with a real feature, tested on emulator/device, with release notes and a demo video / walkthrough.",
        "items": []
      }
    ],
    "proof": "app build, release notes, a manual test report, and a demo walkthrough.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/app-development.html",
    "sourceSha256": "952ac9955beb4289b7977142acd2cfc410c14630012004e8ad1bedf52af48eea"
  },
  {
    "name": "Finance",
    "sourceTitle": "Finance",
    "slug": "finance",
    "path": "/labs/finance.html",
    "domain": "management",
    "artwork": "ledger",
    "simulate": "Broken statements, reconciliation mismatches, faulty models.",
    "summaryProof": "Audit-ready financial model.",
    "bug": "finance graduates who can read a textbook statement, but cannot reconcile a messy real one.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "The three statements: profit & loss, balance sheet, cash flow — and how they connect.",
          "Double-entry basics, journals, ledgers, and trial balance.",
          "Excel for finance: formulas, lookup, pivot, and formula auditing.",
          "Accruals, depreciation, and provisions — where textbook answers diverge from real books.",
          "Bank reconciliation basics.",
          "Reading a real annual report and spotting key items."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "Excel, a sample ledger / ERP export, bank statements.",
        "items": [
          "BUG #1: Trial balance does not balance — find the missing / duplicated entry, correct it with a journal note.",
          "BUG #2: Bank reconciliation mismatch — trace each difference to timing, error, or missing entry; clear it item by item.",
          "BUG #3: Faulty model: a forecast formula references the wrong period — find it, fix it, show the corrected forecast.",
          "BUG #4: Cash flow does not tie to profit — reconcile profit to cash, find the working-capital / non-cash cause."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Trace a balance-sheet figure to source documents (invoices, receipts, bank entries) across a messy ledger.",
          "Correct a figure with proper documentation and an audit trail, not a plug number.",
          "Reconcile three reports that disagree; explain which is right and why, in writing.",
          "Build a month-end checklist (reconciliations, accruals, reviews) and apply it to a sample month."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — an audit-ready financial model with a reconciliation note, assumptions, and limitations stated, presented as if to a reviewer.",
        "items": []
      }
    ],
    "proof": "financial model file, reconciliation note, and a assumptions/limitations sheet.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/finance.html",
    "sourceSha256": "ada64f51efb4bb542f989926af6cf3991a923043ac34a2bc2aa968f51ab7e4c9"
  },
  {
    "name": "Business Analytics",
    "sourceTitle": "Business Analytics",
    "slug": "business-analytics",
    "path": "/labs/business-analytics.html",
    "domain": "management",
    "artwork": "decision",
    "simulate": "Messy business data, misleading reports.",
    "summaryProof": "Decision dashboard with recommendations.",
    "bug": "analysts who can make a chart, but cannot answer a business question reliably.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Business questions first: defining a KPI before building a chart.",
          "Excel / SQL basics for business data: cleaning, joining, aggregating.",
          "Dashboard basics: measures, filters, and choosing the right chart.",
          "Segmentation and cohort basics.",
          "Variance analysis: actual vs target / prior period.",
          "Writing an insight: claim, evidence, action — not just a chart title."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "Excel, SQL, a dashboard tool, sample business data.",
        "items": [
          "BUG #1: Two teams report different revenue for the same month — find the definition / filter difference, align it, document the single definition.",
          "BUG #2: A KPI jumps with no business change — trace it to a data / date / inclusion error, fix it.",
          "BUG #3: A dashboard misleads because of a wrong aggregation (e.g. averaging averages) — correct it, show the right number.",
          "BUG #4: A segment analysis is biased by a missing group — find the missing group, correct the analysis, state the limit."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Trace a KPI to its source data and definition across multiple reports; build a KPI dictionary.",
          "Fix an upstream definition error and prove downstream reports change correctly.",
          "Compare a new analysis with a prior one: what changed, what is comparable, what is not?",
          "Present findings to a mentor as a decision-maker: recommendation, evidence, risk."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a decision dashboard + written recommendations for a real business problem, with data sources and caveats.",
        "items": []
      }
    ],
    "proof": "dashboard, KPI dictionary entry, and a recommendation note with evidence and caveats.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/business-analytics.html",
    "sourceSha256": "55d1ad25cf00d8e914cc4783b9251df3f150a667853c2be8d4637068debd2c45"
  },
  {
    "name": "Supply Chain Management",
    "sourceTitle": "Supply Chain Management",
    "slug": "supply-chain-management",
    "path": "/labs/supply-chain-management.html",
    "domain": "management",
    "artwork": "logistics",
    "simulate": "Stock-outs, demand swings, inventory errors.",
    "summaryProof": "Optimised inventory / logistics plan.",
    "bug": "learners who know supply chain terms, but cannot fix a stock-out or a broken plan.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Inventory basics: stock, reorder point, safety stock, and lead time.",
          "Demand forecasting basics: trends, seasonality, and forecast error.",
          "Procurement and vendor basics: orders, lead times, and costs.",
          "Logistics basics: warehousing, transport, and delivery performance.",
          "Excel for planning: tables, formulas, and scenario checks.",
          "Reading a supply plan and spotting a shortage before it happens."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "Excel, sample order / inventory / vendor data.",
        "items": [
          "BUG #1: Stock-out on a fast-moving item — find the forecast / reorder error, correct the plan, show the new stock cover.",
          "BUG #2: Excess stock on a slow item — find the over-order cause, propose a drawdown plan without a new stock-out.",
          "BUG #3: A vendor delay breaks a plan — re-plan with available stock and lead times, show the service impact.",
          "BUG #4: Demand forecast is systematically wrong for one category — find the seasonality / data error, correct the forecast method."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Navigate a supply network: orders, vendors, warehouses, and lead times; trace a shortage to its true cause.",
          "Fix a plan without creating a new shortage elsewhere; check knock-on effects.",
          "Build a supplier / lead-time tracker and use it to prioritise expediting.",
          "Present a plan change with cost vs service trade-offs, in writing."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — an optimised inventory / logistics plan for a real-style business, with cost and service trade-offs stated.",
        "items": []
      }
    ],
    "proof": "inventory / logistics plan, forecast-error comparison, and a trade-off note.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/supply-chain-management.html",
    "sourceSha256": "de2747f28b342dfa63d3f60a4647dbb50eff21557a27981ed855334c59f4b109"
  },
  {
    "name": "Salesforce",
    "sourceTitle": "Salesforce",
    "slug": "salesforce",
    "path": "/labs/salesforce.html",
    "domain": "management",
    "artwork": "workflow",
    "simulate": "Support / admin tickets, broken CRM workflows.",
    "summaryProof": "Working CRM workflow.",
    "bug": "CRM learners who can create records, but cannot fix a broken business workflow.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Salesforce objects, fields, and relationships; standard vs custom objects.",
          "Workflows, flows, and validation rules — and how they interact.",
          "Data quality basics: duplicates, required fields, and picklists.",
          "Reports and dashboards basics.",
          "Permissions and profiles basics.",
          "Reading a support ticket and reproducing a CRM problem in a practice org."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "Salesforce practice org, flow debugger, reports, data loader concepts.",
        "items": [
          "BUG #1: A workflow does not fire for some records — find the criteria / order-of-execution cause, fix it, test all record types.",
          "BUG #2: Duplicate records break reporting — find the duplicate rule gap, clean the data safely, prevent recurrence.",
          "BUG #3: An automation overwrites good data — find the faulty flow step, fix it, restore affected records in the test org.",
          "BUG #4: A report shows the wrong pipeline — find the filter / field error, correct it, reconcile to source records."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Navigate a real org: automations, integrations, permissions; map what runs when for one business process.",
          "Fix a workflow safely for all users and profiles, with test records for each profile.",
          "Clean and migrate a small dataset without breaking relationships or automations.",
          "Review a peer's flow for order-of-execution, recursion, and permission risks."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a working CRM workflow for a real business process, with test records, a handover note, and a demo.",
        "items": []
      }
    ],
    "proof": "working workflow in the practice org, test-record pack, and a handover note.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/salesforce.html",
    "sourceSha256": "429d777bfc0f27d6e6dce3d3bc00a6c3cd7611d502398a114ac500f55c35f9ad"
  },
  {
    "name": "SAP FICA",
    "sourceTitle": "SAP FICA",
    "slug": "sap-fica",
    "path": "/labs/sap-fica.html",
    "domain": "management",
    "artwork": "posting",
    "simulate": "Enterprise finance tickets, posting / reconciliation errors.",
    "summaryProof": "Corrected, documented process.",
    "bug": "SAP learners who know screens, but cannot clear a real finance ticket.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "SAP finance basics: company code, chart of accounts, and document structure.",
          "Postings, reversals, and document types.",
          "Accounts receivable / payable basics and open items.",
          "Reconciliation accounts and clearing basics.",
          "Reading SAP documents, line items, and error messages.",
          "Controls basics: why a posting must be documented, not forced."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "SAP practice system / screenshots and sample documents, Excel for reconciliation.",
        "items": [
          "BUG #1: A document will not post — read the error, find the missing field / account / period cause, post it correctly.",
          "BUG #2: An open item will not clear — find the amount / assignment difference, clear it with documentation.",
          "BUG #3: A reconciliation break between subledger and general ledger — trace it document by document, find the cause.",
          "BUG #4: A ticket stuck in a process (approval / payment run) — trace the process step, unblock it correctly, document the action."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Trace a figure through SAP modules and documents to its source; build a document trail.",
          "Correct a figure with a proper reversal / correction document, not a direct edit.",
          "Build a month-end control checklist (open items, reconciliations, period close) and apply it.",
          "Review a peer's correction for audit trail, approval, and completeness."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a corrected, documented end-to-end process with a control checklist, presented as if to a finance reviewer.",
        "items": []
      }
    ],
    "proof": "corrected process documentation, document trail, and a control checklist.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/sap-fica.html",
    "sourceSha256": "31338fa57a5cf8467146c1909f29292dd84d0f0e2b7deff7a25ec9e87dbf3ed4"
  },
  {
    "name": "HRM",
    "sourceTitle": "HRM",
    "slug": "hrm",
    "path": "/labs/hrm.html",
    "domain": "management",
    "artwork": "candidates",
    "simulate": "Recruitment pipeline, screening, onboarding tickets.",
    "summaryProof": "Hiring pipeline + screening scorecards.",
    "bug": "HR learners who know HR terms, but cannot run a hiring pipeline that actually fills roles.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Writing a job brief: must-have vs nice-to-have, and how it shapes shortlisting.",
          "Candidate shortlisting: reading profiles against a brief, not keywords alone.",
          "Structured interview basics: questions, scoring, and bias risks.",
          "HR operations basics: offers, joining, and onboarding checklists.",
          "HR data basics: pipeline stages, conversion rates, and time-to-fill.",
          "Communication basics: candidate updates, rejections, and internal notes."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "sample profiles, pipeline tracker, interview scorecards.",
        "items": [
          "BUG #1: Pipeline breaks: good candidates drop out — find the communication / stage cause, fix the process.",
          "BUG #2: Shortlisting errors: strong profiles rejected, weak ones advanced — audit the shortlist against the brief, correct it with reasons.",
          "BUG #3: Onboarding gaps: a new hire arrives with missing access / documents — build and apply a complete onboarding checklist.",
          "BUG #4: Lost candidates: no record of why candidates left — rebuild tracking, add stage-exit reasons, report the pattern."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Navigate HR systems and candidate data: trace a candidate journey from application to offer, find every gap.",
          "Fix data and communication gaps without losing history; document changes.",
          "Run a structured interview panel simulation: score, compare, and defend a decision with evidence.",
          "Review a peer's hiring decision for bias, missing evidence, and brief alignment."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a hiring pipeline + shortlisting scorecards for a real role, with a hiring decision note and an onboarding plan.",
        "items": []
      }
    ],
    "proof": "hiring pipeline tracker, shortlisting scorecards, hiring decision note, and an onboarding checklist.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/hrm.html",
    "sourceSha256": "945a2664edade43952d2300776a1e8284f7c95535a35d37526ff56e9708bbd34"
  },
  {
    "name": "Embedded Systems",
    "sourceTitle": "Embedded Systems",
    "slug": "embedded-systems",
    "path": "/labs/embedded-systems.html",
    "domain": "engineering",
    "artwork": "chip",
    "simulate": "Faulty firmware, sensor / hardware bugs.",
    "summaryProof": "Working device logic, debugged.",
    "bug": "ECE graduates who know circuits in theory, but cannot debug firmware on hardware.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "C for embedded: pointers, registers, and bit operations applied to hardware.",
          "Microcontroller basics: GPIO, timers, interrupts, and UART.",
          "Reading datasheets and schematics to find pin / voltage / timing facts.",
          "Sensor basics: ADC, digital sensors, and noisy readings.",
          "Debugging tools: serial logs, LEDs, multimeter concepts, and debugger basics.",
          "Writing a small firmware task and testing it with a test log."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "C toolchain, simulator / dev board concepts, serial logs, datasheets.",
        "items": [
          "BUG #1: Sensor reads garbage values — decide code vs wiring vs sensor fault, fix the real cause, prove stable readings.",
          "BUG #2: Firmware hangs intermittently — find the interrupt / timing / stack cause, fix it, show a long stable run.",
          "BUG #3: Hardware-software mismatch: code expects one pin, board uses another — find it in schematic vs code, correct it, document the change.",
          "BUG #4: Timing bug: a task runs too late / too often — measure timing, fix the timer / interrupt priority, verify."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Navigate firmware + hardware docs for an unfamiliar board: map pins, peripherals, and code modules.",
          "Trace a fault to code vs circuit with evidence, not guessing; test both hypotheses.",
          "Refactor a messy firmware module (split init, loop, and handlers) without changing behaviour.",
          "Review a peer's firmware change for timing, interrupt safety, and hardware limits."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — working device logic demonstrated end-to-end, with a test log and a fault report.",
        "items": []
      }
    ],
    "proof": "working device logic (code + demo), test log, and a fault report.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/embedded-systems.html",
    "sourceSha256": "e18eaeb645528e23c3c41138ae56d101a2dae79c1b50cabd5cb6e948c52022aa"
  },
  {
    "name": "IoT and Robotics",
    "sourceTitle": "IoT & Robotics",
    "slug": "iot-robotics",
    "path": "/labs/iot-robotics.html",
    "domain": "engineering",
    "artwork": "robot",
    "simulate": "Failing sensors, unreliable device data.",
    "summaryProof": "Working IoT prototype simulation.",
    "bug": "learners who can connect a sensor once, but cannot keep a device system working.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Sensors and actuators: types, ranges, and failure modes.",
          "Microcontroller / single-board basics and GPIO.",
          "IoT communication basics: MQTT / HTTP concepts, topics, and payloads.",
          "Data flow: sensor → device → gateway → dashboard.",
          "Robotics basics: motors, servos, and control loops.",
          "Logging and monitoring a device system."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "sensor kits / simulators, MQTT tools, dashboards, logs.",
        "items": [
          "BUG #1: Sensor data stops arriving — trace sensor → device → network → dashboard, find the broken link, restore it.",
          "BUG #2: Unreliable data: spikes and gaps — find the sensor / power / network cause, filter or fix correctly, prove stability.",
          "BUG #3: Robot movement fault: wrong direction / overshoot — find the control / wiring / calibration cause, fix it, test safely.",
          "BUG #4: Dashboard shows stale data — find the caching / connection cause, fix freshness, add a stale-data alert."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Navigate a device network and code: map every device, topic, and dashboard field.",
          "Fix the weak link in a multi-device system without breaking other devices.",
          "Add monitoring (heartbeat, battery, signal) to an unmonitored device.",
          "Review a peer's device change for safety, power, and failure handling."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a working IoT prototype simulation with a fault log, operating note, and demo.",
        "items": []
      }
    ],
    "proof": "prototype simulation, fault log, and an operating note.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/iot-robotics.html",
    "sourceSha256": "7204a98221026dcd80a996a2050c50e9390a0f54139863fae38d22d30c61b4a9"
  },
  {
    "name": "AutoCAD",
    "sourceTitle": "AutoCAD",
    "slug": "autocad",
    "path": "/labs/autocad.html",
    "domain": "engineering",
    "artwork": "drawing",
    "simulate": "Flawed drawings, measurement / layout errors.",
    "summaryProof": "Corrected drawing set.",
    "bug": "learners who can draw, but cannot correct a drawing set a site can actually build from.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "AutoCAD interface, units, and drawing setup.",
          "Layers, line types, and drawing standards.",
          "Precision drawing: snaps, dimensions, and scale.",
          "Blocks, layouts, and title blocks.",
          "Reading a drawing set: plans, sections, and details.",
          "Revision basics: what changed, why, and where it shows."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "AutoCAD, sample drawing sets, dimension checklists.",
        "items": [
          "BUG #1: Flawed drawing: a dimension does not add up — find the error, correct it, verify all related dimensions.",
          "BUG #2: Measurement / scale error: a detail is drawn at the wrong scale — correct scale and annotations.",
          "BUG #3: Missing details: a junction cannot be built from the drawing — add the missing detail consistently.",
          "BUG #4: Clashing dimensions across sheets — reconcile all sheets, issue a revision note."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Navigate a full drawing set and its revisions; trace one change across every affected sheet.",
          "Correct a change consistently: plan, section, and detail must agree.",
          "Audit a drawing set for standards, layers, and completeness; list every non-conformance.",
          "Review a peer's correction for buildability, not just appearance."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a corrected drawing set with a revision note, ready for a site reviewer to check.",
        "items": []
      }
    ],
    "proof": "corrected drawing set, revision note, and an audit checklist.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/autocad.html",
    "sourceSha256": "71e117d8bd8453749cc29d441abc04e9e514598d878dc134cd05ca8c682c0ed8"
  },
  {
    "name": "CATIA",
    "sourceTitle": "CATIA",
    "slug": "catia",
    "path": "/labs/catia.html",
    "domain": "engineering",
    "artwork": "assembly",
    "simulate": "Design defects, manufacturing-unfriendly models.",
    "summaryProof": "Corrected 3D model.",
    "bug": "designers who can model a part, but cannot fix a model that cannot be manufactured.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "CATIA sketcher basics: constraints, dimensions, and fully defined sketches.",
          "Part design: pads, pockets, fillets, and chamfers.",
          "Assembly basics: constraints, mates, and interference concepts.",
          "Drawing basics from a 3D model.",
          "Feature history: why order matters, and how a broken reference propagates.",
          "Manufacturing basics: tolerances, draft, and wall thickness."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "CATIA, sample parts and assemblies, interference checks.",
        "items": [
          "BUG #1: Design defect: a part interferes in assembly — find the feature cause, fix it, prove zero interference.",
          "BUG #2: Manufacturing-unfriendly feature: a thin wall / sharp internal corner — redesign for manufacture, document the change.",
          "BUG #3: Broken references after an edit — repair the feature tree without rebuilding the whole part.",
          "BUG #4: Drawing does not match the model — find the outdated view / dimension, update it, verify."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Navigate assemblies and parts: trace a defect to its feature history.",
          "Fix a defect without breaking the assembly: check mates, references, and downstream drawings.",
          "Audit a model for tolerances, draft, and manufacturability; list every issue by severity.",
          "Review a peer's model change for assembly impact and manufacturing risk."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a corrected 3D model with a manufacturing note, presented as if to a manufacturing reviewer.",
        "items": []
      }
    ],
    "proof": "corrected 3D model, manufacturing note, and an interference-check report.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/catia.html",
    "sourceSha256": "b354e4f7a34c4532ca2a6f7615f94bc60e77df08438e1b6f531cdb3fe0f325a5"
  },
  {
    "name": "Quality and Safety",
    "sourceTitle": "Quality & Safety",
    "slug": "quality-safety",
    "path": "/labs/quality-safety.html",
    "domain": "engineering",
    "artwork": "inspection",
    "simulate": "Defect audits, safety gaps, failed checks.",
    "summaryProof": "Audit report + corrective plan.",
    "bug": "learners who know quality terms, but cannot run an audit that finds real defects.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Quality basics: defect, non-conformance, and corrective action.",
          "Audit basics: scope, checklist, evidence, and sampling.",
          "Safety basics: hazards, risk, and controls.",
          "Root-cause basics: 5 Whys and fishbone, applied to a real case.",
          "Documentation basics: findings that can be verified, not opinions.",
          "Checklists and inspection methods for a sample process."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "sample process records, checklists, audit templates.",
        "items": [
          "BUG #1: Defect audit: a process produces defects — audit it, find the root cause, not just the defective output.",
          "BUG #2: Safety gap: a control exists on paper but not in practice — find the gap, propose a workable control.",
          "BUG #3: Failed check: a checklist passes but defects escape — find the checklist / sampling flaw, fix it.",
          "BUG #4: Repeat defect: the same failure returns after a fix — find why the first fix did not hold, propose a stronger action."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Navigate plant / process records: trace a defect to process, material, method, or people — with evidence.",
          "Audit a full process end-to-end, rank findings by risk, and separate facts from assumptions.",
          "Build a corrective action plan with owners, dates, and verification checks.",
          "Review a peer's audit for evidence quality and root-cause strength."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — an audit report + corrective action plan for a real-style process, presented as if to a quality reviewer.",
        "items": []
      }
    ],
    "proof": "audit report, corrective action plan with owners and verification checks.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/quality-safety.html",
    "sourceSha256": "2e484d6d416f37edd791f8dbb75c1a4433360f5f1f19e74a5fea2b0a0a1e88a4"
  },
  {
    "name": "Construction Planning",
    "sourceTitle": "Construction Planning",
    "slug": "construction-planning",
    "path": "/labs/construction-planning.html",
    "domain": "engineering",
    "artwork": "schedule",
    "simulate": "Delayed plans, BOQ / estimation errors.",
    "summaryProof": "Revised project plan.",
    "bug": "planners who can make a schedule, but cannot recover a delayed plan.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Planning basics: work breakdown, activities, and dependencies.",
          "Scheduling basics: durations, critical path, and float.",
          "BOQ basics: quantities, rates, and cost build-up.",
          "Resource basics: labour, material, and equipment planning.",
          "Reading drawings and specifications for planning inputs.",
          "Progress reporting basics: planned vs actual."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "scheduling tool / Excel, sample plans, BOQs, progress reports.",
        "items": [
          "BUG #1: Delayed plan: a project slips by weeks — find the critical-path cause, not just the latest activity.",
          "BUG #2: Estimation error: a BOQ quantity is wrong — find it, correct it, show the cost impact.",
          "BUG #3: Resource clash: two activities need the same crew / equipment — re-sequence, show the new critical path.",
          "BUG #4: Missing scope: work exists on site but not in the plan — add it correctly, with time and cost impact."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Navigate project plans and contracts: trace a delay to its contractual / site cause, with evidence.",
          "Re-plan without hiding impact: show original vs revised dates, and what changed.",
          "Build a progress tracker (planned vs actual, earned value basics) and use it to forecast completion.",
          "Review a peer's revised plan for hidden float consumption and unrealistic recovery."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a revised project plan with a delay note, cost/time impact, and a recovery option, presented as if to a project reviewer.",
        "items": []
      }
    ],
    "proof": "revised project plan, delay note, and a cost/time impact sheet.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/construction-planning.html",
    "sourceSha256": "87c8d71811cc2c7c1c29dc770b0301848e9e11ab02eef5bdea32f43e0800d733"
  },
  {
    "name": "Medical Coding",
    "sourceTitle": "Medical Coding",
    "slug": "medical-coding",
    "path": "/labs/medical-coding.html",
    "domain": "medical",
    "artwork": "chart",
    "simulate": "Miscoded charts, claim errors, audit findings.",
    "summaryProof": "Audited, correctly coded charts.",
    "bug": "coders who know codes, but cannot audit a chart that will actually pass a claim.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Coding systems basics: ICD, CPT/HCPCS concepts, and code structure.",
          "Reading a patient chart: notes, diagnoses, procedures, and documentation.",
          "Coding guidelines basics: what documentation supports which code.",
          "Modifiers basics and common modifier errors.",
          "Claim basics: what a payer checks, and why claims deny.",
          "Auditing basics: sample, check, document, correct."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "sample charts, coding guidelines, claim denial examples.",
        "items": [
          "BUG #1: Miscoded chart: a diagnosis code does not match documentation — find it, correct it, note the guideline.",
          "BUG #2: Claim denial: a procedure code is denied — find the documentation / code / modifier cause, correct it.",
          "BUG #3: Documentation gap: a procedure is done but not documented well enough to code — identify the gap, note what documentation is needed.",
          "BUG #4: Upcoding / downcoding risk: a chart is coded too high or too low — correct it to what documentation supports, with reasons."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Navigate patient records and guidelines: trace each code to its documentation, across a full chart set.",
          "Correct a set of charts consistently: same error, same correction, same guideline note.",
          "Audit a chart set, rank errors by claim / compliance risk, and separate coding errors from documentation errors.",
          "Review a peer's coding for guideline compliance and documentation support."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — an audited set of correctly coded charts with an audit note, presented as if to a coding reviewer.",
        "items": []
      }
    ],
    "proof": "audited chart set, audit note with guideline references, and an error-rate summary.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/medical-coding.html",
    "sourceSha256": "d7b08b96cf9a88ab42eaf53e160d84f3c6494b6c55b431bd8ebd207792184381"
  },
  {
    "name": "Pharmacovigilance",
    "sourceTitle": "Pharmacovigilance",
    "slug": "pharmacovigilance",
    "path": "/labs/pharmacovigilance.html",
    "domain": "medical",
    "artwork": "safety",
    "simulate": "Adverse-event reports, safety-case errors.",
    "summaryProof": "Audited safety-case reports.",
    "bug": "learners who know drug safety terms, but cannot handle a real adverse-event case correctly.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Drug safety basics: adverse events, seriousness, and expectedness concepts.",
          "Case basics: patient, drug, event, reporter, and timeline.",
          "Causality assessment basics.",
          "MedDRA coding concepts for events and drugs.",
          "Reporting basics: what must be reported, to whom, and by when.",
          "Follow-up basics: what information is missing, and how to ask for it."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "sample adverse-event cases, safety database concepts, reporting templates.",
        "items": [
          "BUG #1: Adverse-event error: a case is coded to the wrong event term — find it, correct it, document the reason.",
          "BUG #2: Incomplete case: a serious case lacks key data — identify what is missing, draft a follow-up request.",
          "BUG #3: Wrong causality / seriousness assessment — reassess with evidence, document the reasoning.",
          "BUG #4: Duplicate case: the same event is reported twice — detect the duplicate, merge / link correctly, document it."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Navigate a safety database and cases: trace a case from report to assessment to submission.",
          "Follow up missing data across multiple cases, prioritising by seriousness.",
          "Audit a case set for coding, causality, and timeliness errors; rank by risk.",
          "Review a peer's case assessment for evidence, consistency, and completeness."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — audited safety-case reports with a follow-up plan, presented as if to a safety reviewer.",
        "items": []
      }
    ],
    "proof": "audited safety-case reports, follow-up plan, and an error summary.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/pharmacovigilance.html",
    "sourceSha256": "c5427bf22eb650ea2063b4f8d2475557af48f51c4da3cc4d3147743c7862492e"
  },
  {
    "name": "Bioinformatics",
    "sourceTitle": "Bioinformatics",
    "slug": "bioinformatics",
    "path": "/labs/bioinformatics.html",
    "domain": "medical",
    "artwork": "genome",
    "simulate": "Genomic data errors, failing analysis pipelines.",
    "summaryProof": "Cleaned analysis pipeline + report.",
    "bug": "learners who can run a bioinformatics tool once, but cannot trust a pipeline result.",
    "curriculum": [
      {
        "heading": "$ step-01 brushup // weeks 1–2 — Topics taught:",
        "body": "",
        "items": [
          "Genomics basics: DNA, genes, variants, and sequence formats (FASTA/FASTQ concepts).",
          "Python for bioinformatics: parsing, filtering, and summarising sequence data.",
          "Quality control basics: read quality, adapters, and contamination checks.",
          "Alignment and variant concepts: what a tool does, and what can go wrong.",
          "Reproducibility basics: tool versions, parameters, and logs.",
          "Reading a pipeline result and spotting a suspicious output."
        ]
      },
      {
        "heading": "$ step-02 debug // weeks 3–4 — Production Debugging. Tools:",
        "body": "Python, sample sequence data, QC tools, pipeline logs.",
        "items": [
          "BUG #1: Pipeline failure: a run crashes — read the log, find the input / parameter / version cause, fix and rerun.",
          "BUG #2: Genomic data error: mislabelled / contaminated samples — detect it with QC, correct or exclude with reasons.",
          "BUG #3: Wrong parameters produce a misleading result — find the parameter error, rerun correctly, compare outputs.",
          "BUG #4: Silent failure: a pipeline finishes but with empty / truncated output — find the silent cause, add a QC check so it cannot pass silently again."
        ]
      },
      {
        "heading": "$ step-03 navigate // weeks 5–7 — Codebase / System Navigation:",
        "body": "",
        "items": [
          "Navigate pipelines and datasets: trace a result to input, tool version, and parameters.",
          "Fix a pipeline step without breaking downstream steps; verify with a small test dataset.",
          "Audit a pipeline for reproducibility: versions, parameters, and data provenance, documented.",
          "Review a peer's analysis for QC gaps, parameter choices, and over-claimed conclusions."
        ]
      },
      {
        "heading": "$ step-04 ship // weeks 8–9 — Shipping Features:",
        "body": "capstone — a cleaned analysis pipeline + report with methods and limitations stated, presented as if to a scientific reviewer.",
        "items": []
      }
    ],
    "proof": "cleaned pipeline code, analysis report with methods and limitations, and a QC summary.",
    "priceNote": "What ₹9,999 buys: brushup → production debugging → codebase navigation → shipping features, reviewed by mentors, ending with work you can show to a hiring manager.",
    "cta": "Sign Up →",
    "sourceUrl": "https://bugrefinery.com/labs/bioinformatics.html",
    "sourceSha256": "4670ea5408e7d50f1ce6ec746d4e0dc1e827c9af1589a52416a1d7f675f341e8"
  }
] as const;
