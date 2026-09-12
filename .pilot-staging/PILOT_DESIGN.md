# MotivaHub Image Sourcing — 5-Article Pilot Design

## PILOT SCOPE

**Mode:** Safe staging/review only  
**Production changes:** None  
**API keys required:** No (mock/simulated responses)  
**Purpose:** Validate pipeline design, human review flow, duplicate detection, and metadata checks before scaling to 92 articles

---

## PILOT ARTICLES

| # | Article | Topic | Current Image | Status |
|---|---------|-------|---------------|--------|
| 1 | `/journal/deep-work-ritual/` | Productivity | Picsum placeholder | NEEDS IMAGE SOURCE |
| 2 | `/journal/vaincre-procrastination/` | Productivity | Picsum placeholder | NEEDS IMAGE SOURCE |
| 3 | `/journal/meal-prep-dimanche/` | Nutrition | Picsum placeholder | NEEDS IMAGE SOURCE |
| 4 | `/journal/langage-corps-confiance/` | Confidence | Picsum placeholder | NEEDS IMAGE SOURCE |
| 5 | `/journal/community-discipline/` | Confidence | Real photo mismatch | FLAGGED MISMATCH |

---

## ARTICLE 1: /journal/deep-work-ritual/

**Title:** I Built a 3-Hour Deep Work Ritual That Actually Works (After 12 Failed Attempts)  
**Topic:** Productivity  
**Visual Brief:** A person in deep focused work — phone away, single task on screen, calm concentrated expression. Shows distraction-free depth.

### API Search Queries

**Pexels:**
1. `deep work focused person desk phone away`
2. `person concentrated work single task calm`
3. `distraction free workspace focused worker`

**Unsplash:**
1. `deep work focus person desk`
2. `concentrated work single task`
3. `phone away focused workspace`

### Expected API Response Fields

```json
{
  "id": "12345",
  "url": "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg",
  "photographer": "Photographer Name",
  "photographer_url": "https://www.pexels.com/@photographer",
  "source_page": "https://www.pexels.com/photo/12345/",
  "alt": "Description of the image",
  "width": 1260,
  "height": 750,
  "avg_color": "#8B7355",
  "license": "Pexels License",
  "download_url": "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}
```

### Metadata Checks

- ✅ Dimensions: Prefer 16:9 or 3:2 aspect ratio
- ✅ License: Must be Pexels License (free for commercial use)
- ❌ Reject if: Width < 1200px (too small for web)
- ❌ Reject if: Aspect ratio < 1.2 or > 2.0 (too square or too wide)

### Duplicate Check

- Compare image hash against existing pool
- Check if photographer already has 3+ images in use
- Flag if visual similarity > 80% to existing images

---

## ARTICLE 2: /journal/vaincre-procrastination/

**Title:** How to Stop Procrastinating — The Real Science Behind Procrastination  
**Topic:** Productivity  
**Visual Brief:** A person delaying a task while distractions pull attention — visual tension between work and avoidance. Shows the procrastination dynamic.

### API Search Queries

**Pexels:**
1. `procrastination person avoiding work distraction`
2. `person delaying task phone distraction`
3. `unfinished work distracted person`

**Unsplash:**
1. `procrastination distraction person`
2. `avoiding work person distracted`
3. `unfinished task distraction`

### Expected API Response Fields

Same schema as Article 1.

### Metadata Checks

- ✅ Dimensions: Prefer 16:9 or 3:2
- ✅ License: Free for commercial use
- ❌ Reject if: Width < 1200px
- ❌ Reject if: Aspect ratio < 1.2 or > 2.0

### Duplicate Check

- Compare against existing productivity images
- Ensure not same image as deep-work-ritual (different concept: focus vs avoidance)

---

## ARTICLE 3: /journal/meal-prep-dimanche/

**Title:** Meal Prep Sunday: How to Eat Healthy All Week in 2 Hours  
**Topic:** Nutrition  
**Visual Brief:** Simple, prepared meals — not gourmet, just consistent healthy choices. Shows meal prep as routine.

### API Search Queries

**Pexels:**
1. `meal prep containers healthy food organized`
2. `prepared meals containers fridge`
3. `healthy meal prep batch cooking`

**Unsplash:**
1. `meal prep healthy containers`
2. `batch cooking prepared meals`
3. `organized healthy food containers`

### Expected API Response Fields

Same schema as Article 1.

### Metadata Checks

- ✅ Dimensions: Prefer 16:9 or 4:3
- ✅ License: Free for commercial use
- ❌ Reject if: Width < 1200px
- ❌ Reject if: Aspect ratio < 1.0 or > 2.0

### Duplicate Check

- Compare against existing nutrition images
- Ensure not same image as other food articles unless concept is identical

---

## ARTICLE 4: /journal/langage-corps-confiance/

**Title:** Body Language Secrets: How to Project Confidence Without Saying a Word  
**Topic:** Confidence  
**Visual Brief:** A person with open, confident posture — not aggressive, just grounded and present. Shows body language as communication.

### API Search Queries

**Pexels:**
1. `confident body language open posture person`
2. `person standing confident posture calm`
3. `open body language grounded presence`

**Unsplash:**
1. `confident posture body language`
2. `open posture calm confident person`
3. `grounded presence body language`

### Expected API Response Fields

Same schema as Article 1.

### Metadata Checks

- ✅ Dimensions: Prefer 16:9 or 3:2
- ✅ License: Free for commercial use
- ❌ Reject if: Width < 1200px
- ❌ Reject if: Aspect ratio < 1.2 or > 2.0

### Duplicate Check

- Compare against existing confidence images
- Ensure not same image as other confidence articles unless concept is identical

---

## ARTICLE 5: /journal/community-discipline/

**Title:** Community as Discipline — The Long Game of Belonging  
**Topic:** Confidence/Discipline  
**Visual Brief:** People participating together, team practice, accountability, shared effort, group routine. Shows community as discipline.

### API Search Queries

**Pexels:**
1. `group accountability team practice shared effort`
2. `community discipline group routine together`
3. `people supporting each other accountability`

**Unsplash:**
1. `team accountability group support`
2. `community practice shared effort`
3. `group discipline together`

### Expected API Response Fields

Same schema as Article 1.

### Metadata Checks

- ✅ Dimensions: Prefer 16:9
- ✅ License: Free for commercial use
- ❌ Reject if: Width < 1200px
- ❌ Reject if: Aspect ratio < 1.2 or > 2.0

### Duplicate Check

- Compare against existing confidence/discipline images
- Ensure not same image as other community articles unless concept is identical

---

## PIPELINE ARCHITECTURE

### Stage 1: Query Generation
- Input: Article metadata + visual brief
- Output: 2-3 search queries per API
- Storage: `.pilot-staging/pipeline/queries.json`

### Stage 2: API Query
- Input: Search queries + API key
- Output: Raw API responses with metadata
- Storage: `.pilot-staging/candidates/raw-api-responses/`
- **No production code modified**

### Stage 3: Candidate Download
- Input: API response URLs
- Output: Downloaded images to staging directory
- Storage: `.pilot-staging/candidates/images/`
- Naming: `{article-slug}-{candidate-number}.jpg`
- **No production images directory touched**

### Stage 4: Metadata Validation
- Input: Downloaded images + API metadata
- Output: Validation report
- Checks:
  - Dimensions >= 1200px width
  - Aspect ratio between 1.2 and 2.0
  - Source URL present and valid
  - Download URL present and valid
  - License is commercial-use allowed
- Storage: `.pilot-staging/reviews/validation-report.json`

### Stage 5: Duplicate Detection
- Input: All candidate images
- Output: Duplicate flags
- Methods:
  - Perceptual hash comparison (if library available)
  - Photographer name frequency check
  - Color histogram similarity
  - Exact URL match
- Storage: `.pilot-staging/reviews/duplicate-report.json`

### Stage 6: Human Review Interface
- Input: Validated, deduplicated candidates
- Output: Approved/rejected decisions
- Format: HTML review page showing:
  - Article title + visual brief
  - Candidate images side-by-side
  - Metadata panel (photographer, source, license, dimensions)
  - Approve/Reject buttons
  - Notes field
- Storage: `.pilot-staging/reviews/{article-slug}-review.html`

### Stage 7: Integration (ONLY after human approval)
- Input: Approved images + human decisions
- Output: Updated article frontmatter
- Actions:
  - Copy approved image to `public/images/blog/`
  - Update article `image:` frontmatter field
  - Record source/license info in PHOTO-CREDITS.md
- **This stage does NOT run in pilot mode**

---

## HUMAN REVIEW FLOW

```
1. Pipeline generates candidates → downloads to staging
2. Validation script filters obviously bad candidates
3. Duplicate detector flags repeats
4. Review HTML page generated with remaining candidates
5. HUMAN opens review page in browser
6. HUMAN sees actual images (not just metadata)
7. HUMAN approves or rejects each candidate
8. HUMAN can add notes for rejected images
9. Approved images move to "ready for integration" queue
10. Integration step requires explicit human confirmation
```

---

## METADATA-BASED CHECKS (Automated)

These checks run automatically. Images that fail are **flagged for human review** but NOT automatically rejected, because metadata alone is not sufficient.

| Check | Method | Action on Failure |
|-------|--------|-------------------|
| Minimum width | API `width` field | Flag: "Image may be too small for web" |
| Aspect ratio | width/height calculation | Flag: "Unusual aspect ratio" |
| License type | API `license` field | Auto-reject if not commercial-use allowed |
| Source URL | API `url` / `source_page` fields | Flag: "Missing source URL" |
| Download URL | API `download_url` field | Flag: "Missing download URL" |
| Photographer frequency | Count per photographer | Flag: "Photographer has 3+ images in use" |
| URL duplicate | Exact URL match against pool | Auto-flag as duplicate |
| Alt text | API `alt` field | Advisory only — shown in review interface, NOT used for auto-rejection |

---

## DUPLICATE DETECTION

### Exact Match
- Compare image URLs exactly
- If URL already in use → flag

### Photographer Saturation
- Count images per photographer in current pool
- If photographer has >= 3 images already → flag
- Prevents one photographer's style from dominating

### Perceptual Hash (if library available)
- Generate hash for each candidate
- Compare against existing image hashes
- If similarity > 80% → flag

### Color Histogram
- Extract dominant colors from image
- Compare against existing images
- If similarity > 85% → flag

---

## FILES CREATED IN PILOT

```
.pilot-staging/
├── pipeline/
│   ├── queries.json                 # Search queries for 5 articles
│   ├── mock-api-responses.json      # Simulated API responses
│   └── pipeline-config.json         # Pipeline configuration
├── candidates/
│   ├── raw-api-responses/           # Where API responses would be stored
│   └── images/                      # Where downloaded images would go
├── reviews/
│   ├── validation-report.json       # Metadata validation results
│   ├── duplicate-report.json        # Duplicate detection results
│   └── deep-work-ritual-review.html # Example human review page
└── exports/
    └── approved-for-integration.json # Queue for final integration step
```

---

## SAFETY GUARANTEES

1. ✅ **No production files modified** — All work in `.pilot-staging/`
2. ✅ **No images downloaded to production** — Staging directory only
3. ✅ **No article frontmatter changed** — Read-only access to articles
4. ✅ **No API keys required** — Mock/simulated responses only
5. ✅ **Human review required** — No automatic integration
6. ✅ **Duplicate detection enabled** — Prevents image reuse
7. ✅ **Metadata validation** — Catches obvious problems automatically
8. ✅ **Explicit integration gate** — Requires human approval + API keys

---

## NEXT STEPS AFTER PILOT APPROVAL

1. Provide Pexels API key (or Unsplash) via environment variable
2. Run actual API queries with real keys
3. Download real candidates to staging
4. Human reviews candidates via generated HTML pages
5. Human approves selections
6. Integration step runs with approved images only
7. Build + Playwright verification

---

## MOCK API RESPONSE EXAMPLE

```json
{
  "article": "deep-work-ritual",
  "query_used": "deep work focused person desk phone away",
  "candidates": [
    {
      "id": "12345",
      "url": "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg",
      "source_page": "https://www.pexels.com/photo/12345/",
      "photographer": "Alex Kotliarskyi",
      "photographer_url": "https://www.pexels.com/@alexkotliarskyi",
      "license": "Pexels License",
      "width": 1260,
      "height": 750,
      "avg_color": "#8B7355",
      "alt": "Person working deeply at desk with phone away",
      "download_url": "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "validation": {
        "dimensions_ok": true,
        "aspect_ratio_ok": true,
        "license_ok": true,
        "source_url_ok": true,
        "download_url_ok": true,
        "flagged": false
      },
      "duplicate_check": {
        "exact_match": false,
        "photographer_count": 1,
        "color_similarity": 0.15,
        "flagged": false
      }
    }
  ]
}
```
