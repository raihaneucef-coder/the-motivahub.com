const https = require('https');
const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'public/images/blog');

// Unsplash photo IDs mapped to topics
const topicPhotos = {
  'Mindset': ['1499750310107-5fef28a66643', '1506905925346-21bda4d32df4', '1499209974431-9dddcece7f88', '1507003211169-0a1dd7228f2d', '1517960413843-0aee8e2b3285'],
  'Habits': ['1484480974693-6ca0a78fb36b', '1506126613408-eca07ce68773', '1513542789411-b6a5d4f31634', '1498050108023-c5249f4df085', '1518281420975-50db6e5d0f45'],
  'Discipline': ['1534438327276-14e5300c3a48', '1571019614242-c5c5dee9f50b', '1549060279-7e168fcee0c2', '1574680096145-d05b474e2155', '1599058945522-28d584b6f0ff'],
  'Productivity': ['1484480974693-6ca0a78fb36b', '1499750310107-5fef28a66643', '1507003211169-0a1dd7228f2d', '1518281420975-50db6e5d0f45', '1488190211105-8b0e65b80b4e'],
  'Goals': ['1464822759023-fed622ff2c3b', '1501785888041-af3ef285b470', '1519681393784-d120267933ba', '1470071459604-3b5ec3a7fe05', '1447752875215-b2761acb3c5d'],
  'Success': ['1522202176988-66273c2fd55f', '1552664730-d307ca884978', '1542744173-8e7e53415bb0', '1556761175-5973dc0f32e7', '1504384308090-c894fdcc538d'],
  'Personal Growth': ['1507679799987-c73779587ccf', '1497436072909-60f360e1d4b1', '1476231682828-37e571bc172f', '1441974231531-c6227db76b6e', '1470252649378-9c29740c9fa8'],
  'Confidence': ['1507003211169-0a1dd7228f2d', '1519085360753-af0119f7cbe7', '1506794778202-cad84cf45f1d', '1500648767791-00dcc994a43e', '1472099645785-5658abf4ff4e'],
  'Sport': ['1534438327276-14e5300c3a48', '1571019614242-c5c5dee9f50b', '1549060279-7e168fcee0c2', '1574680096145-d05b474e2155', '1599058945522-28d584b6f0ff'],
  'Nutrition': ['1490645935967-10de6ba17061', '1512621776951-a57141f2eefd', '1546069901-ba9599a7e63c', '1498837167922-ddd27525d352', '1540189549336-e6e99c3677fe'],
  'Travel': ['1476514525535-07fb3b4ae5f1', '1507525428034-b723cf961d3e', '1501785888041-af3ef285b470', '1469854523086-cc02fe5d8800', '1488646953014-85cb44e25828'],
  'Entertainment': ['1511671782779-c97d3d27a1d4', '1489599849927-2ee91cede3ba', '1514320291840-2e0a9bf2a9ae', '1478720568477-152d9b164e26', '1505682634904-d7c8d95cdc50'],
  'Stories': ['1529156069898-49953e39b3ac', '1517486808906-6ca8b3f04846', '1522202176988-66273c2fd55f', '1523240795612-9a054b0db644', '1516589178581-6cd7833ae3b2'],
  'Finance': ['1554224155-6726b3ff858f', '1579621970563-ebec7560ff3e', '1611974789855-9c2a0a7236a3', '1554224155-8d04cb21cd6c', '1565514020179-026b92b7e4c1'],
  'Relationships': ['1529156069898-49953e39b3ac', '1517486808906-6ca8b3f08006', '1516589178581-6cd7833ae3b2', '1522202176988-66273c2fd55f', '1523240795612-9a054b0db644'],
  'Wellness': ['1544367567-0f2fcb009e0b', '1506126613408-eca07ce68773', '1545389332-cf090694435e', '1507525428034-b723cf961d3e', '1518281420975-50db6e5d0f45']
};

// Article-specific photo mappings
const articlePhotos = {
  'routine-matin-change-tout': '1484480974693-6ca0a78fb36b',
  'routine-matin-sante': '1490645935967-10de6ba17061',
  'pourquoi-profond-objectifs': '1464822759023-fed622ff2c3b',
  'retroengineering-objectifs': '1501785888041-af3ef285b470',
  'ne-brise-jamais-chaine': '1506126613408-eca07ce68773',
  'regle-1-pourcent': '1507679799987-c73779587ccf',
  'mythe-reussite-instantanee': '1522202176988-66273c2fd55f',
  'secret-reussite': '1552664730-d307ca884978',
  'guide-debutant-fitness': '1534438327276-14e5300c3a48',
  'regle-40-pourcent': '1571019614242-c5c5dee9f50b',
  'growth-mindset-rewire': '1499750310107-5fef28a66643',
  'mindset-etat-esprit': '1506905925346-21bda4d32df4',
  'echec-meilleur-professeur': '1497436072909-60f360e1d4b1',
  'journal-croissance': '1484480974693-6ca0a78fb36b',
  'eat-the-frog': '1534438327276-14e5300c3a48',
  'jeune-intermittent': '1490645935967-10de6ba17061',
  'detox-numerique': '1488190211105-8b0e65b80b4e',
  'habitudes-mentales-performants': '1499209974431-9dddcece7f88',
  'art-dire-non': '1507003211169-0a1dd7228f2d',
  'pouvoir-du-non': '1519085360753-af0119f7cbe7',
  'arreter-auto-sabotage': '1507003211169-0a1dd7228f2d',
  'syndrome-imposteur': '1506794778202-cad84cf45f1d',
  'voyage-sante-mentale': '1476514525535-07fb3b4ae5f1',
  'voyage-budget': '1507525428034-b723cf961d3e',
  'trouver-voix': '1500648767791-00dcc994a43e',
  'regle-21-jours': '1506126613408-eca07ce68773',
  'regarder-intentionnellement': '1489599849927-2ee91cede3ba',
  'pouvoir-elimination': '1507525428034-b723cf961d3e',
  'podcasts-education': '1511671782779-c97d3d27a1d4',
  'voyage-lent': '1469854523086-cc02fe5d8800',
  'standard-non-negociable': '1534438327276-14e5300c3a48',
  'meal-prep-dimanche': '1490645935967-10de6ba17061',
  'pouvoir-ecrire-objectifs': '1484480974693-6ca0a78fb36b',
  'styles-attachement': '1529156069898-49953e39b3ac',
  'lire-divertissement': '1514320291840-2e0a9bf2a9ae',
  'investir-debutant': '1554224155-6726b3ff858f',
  'identite-precde-resultat': '1507003211169-0a1dd7228f2d',
  'hydratation-performance': '1495474472287-4d71bcdd2085',
  'resolution-conflits': '1529156069898-49953e39b3ac',
  'histoire-professeur': '1523050854058-8df90110c9f1',
  'histoire-concierge-millionnaire': '1579621970563-ebec7560ff3e',
  'histoire-athlete-recommence': '1534438327276-14e5300c3a48',
  'habitude-5-min-relations': '1529156069898-49953e39b3ac',
  'environnement-beat-volonte': '1497436072909-60f360e1d4b1',
  'echec-retroaction': '1507679799987-c73779587ccf',
  'regle-50-30-20': '1554224155-6726b3ff858f',
  'fond-urgence': '1565514020179-026b92b7e4c1',
  'confiance-inbranlable': '1506794778202-cad84cf45f1d',
  'reseaux-sociaux-divertissement': '1511671782779-c97d3d27a1d4',
  'force-mentale-sport': '1571019614242-c5c5dee9f50b',
  'puissance-dialogue-interieur': '1499750310107-5fef28a66643',
  'voyage-solo': '1488646953014-85cb44e25828',
  'atomic-habits-revue-complete': '1506126613408-eca07ce68773',
  'consistance-bat-intensite': '1534438327276-14e5300c3a48',
  'arreter-couper-avis': '1499209974431-9dddcece7f88',
  'the-morning-athlete': '1534438327276-14e5300c3a48',
  'the-goal-behind-the-goal': '1464822759023-fed622ff2c3b',
  'small-wins-big-life': '1507679799987-c73779587ccf',
  'success-leaves-traces': '1522202176988-66273c2fd55f',
  'strength-is-a-skill': '1534438327276-14e5300c3a48',
  'viral-mindset-shift': '1499750310107-5fef28a66643',
  'growth-feels-like-breaking': '1497436072909-60f360e1d4b1',
  'fuel-before-willpower': '1490645935967-10de6ba17061',
  'attention-as-asset': '1488190211105-8b0e65b80b4e',
  'boundaries-are-love': '1529156069898-49953e39b3ac',
  'comparison-trap': '1517960413843-0aee8e2b3285',
  'the-detour-is-the-destination': '1476514525535-07fb3b4ae5f1',
  'solo-travel-stronger-self': '1488646953014-85cb44e25828',
  'secure-self': '1507003211169-0a1dd7228f2d',
  'two-minute-breath-reset': '1545389332-cf090694435e',
  'the-movie-that-changed-your-week': '1489599849927-2ee91cede3ba',
  'quiet-power-of-doing-less': '1507525428034-b723cf961d3e',
  'play-on-purpose': '1514320291840-2e0a9bf2a9ae',
  'pack-light-stay-long': '1469854523086-cc02fe5d8800',
  'one-target-at-a-time': '1464822759023-fed622ff2c3b',
  'the-plate-that-keeps-you-steady': '1490645935967-10de6ba17061',
  'make-it-measurable-make-it-mine': '1484480974693-6ca0a78fb36b',
  'love-is-a-practice': '1529156069898-49953e39b3ac',
  'play-is-practice-for-life': '1514320291840-2e0a9bf2a9ae',
  'invest-like-beginner': '1554224155-6726b3ff858f',
  'identity-precedes-outcome': '1507003211169-0a1dd7228f2d',
  'water-before-willpower': '1495474472287-4d71bcdd2085',
  'how-to-argue-without-breaking': '1529156069898-49953e39b3ac',
  'the-letter-he-never-sent': '1484480974693-6ca0a78fb36b',
  'the-shop-that-stayed-open': '1579621970563-ebec7560ff3e',
  'zone-confort-croissance': '1497436072909-60f360e1d4b1',
  'five-minute-friendship-habit': '1529156069898-49953e39b3ac',
  'make-good-habits-obvious': '1506126613408-eca07ce68773',
  'the-cost-of-success': '1522202176988-66273c2fd55f',
  'earn-keep-grow': '1554224155-6726b3ff858f',
  'debt-is-a-story': '1565514020179-026b92b7e4c1',
  'confidence-is-a-record-not-a-feeling': '1506794778202-cad84cf45f1d',
  'choose-joy-on-purpose': '1514320291840-2e0a9bf2a9ae',
  'cant-hurt-me-review': '1571019614242-c5c5dee9f50b',
  'calm-is-a-superpower': '1545389332-cf090694435e',
  'beginner-again': '1488646953014-85cb44e25828',
  'atomic-habits-review': '1506126613408-eca07ce68773',
  'athlete-discipline': '1534438327276-14e5300c3a48',
};

async function fetchImage(photoId) {
  const url = `https://images.unsplash.com/photo-${photoId}?w=1200&h=630&fit=crop&q=80`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        fetchImage(photoId).then(resolve).catch(reject);
        return;
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  const files = fs.readdirSync(path.join(__dirname, 'src/content/blog'))
    .filter(f => f.endsWith('.md'));
  
  console.log(`Fetching photos for ${files.length} articles...\n`);
  
  let success = 0;
  let failed = 0;
  
  for (const file of files) {
    const slug = file.replace('.md', '');
    const content = fs.readFileSync(path.join(__dirname, 'src/content/blog', file), 'utf8');
    const topicMatch = content.match(/topic:\s*"([^"]+)"/);
    const topic = topicMatch ? topicMatch[1] : 'Motivation';
    
    // Get photo ID
    let photoId = articlePhotos[slug];
    if (!photoId) {
      const photos = topicPhotos[topic] || topicPhotos['Mindset'];
      photoId = photos[Math.floor(Math.random() * photos.length)];
    }
    
    try {
      const buffer = await fetchImage(photoId);
      if (buffer.length > 5000) {
        fs.writeFileSync(path.join(blogDir, `${slug}.jpg`), buffer);
        console.log(`✅ ${slug}.jpg (${(buffer.length/1024).toFixed(0)}KB)`);
        success++;
      } else {
        console.log(`⚠️ ${slug}: too small`);
        failed++;
      }
    } catch (e) {
      console.log(`❌ ${slug}: ${e.message}`);
      failed++;
    }
    
    // Small delay
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log(`\n=== DONE ===`);
  console.log(`Success: ${success}/${files.length}`);
  console.log(`Failed: ${failed}`);
}

main().catch(console.error);
