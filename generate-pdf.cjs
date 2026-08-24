const puppeteer = require('puppeteer');
const path = require('path');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @page { size: A4; margin: 2cm; }
  body { font-family: Georgia, serif; color: #1a1a1a; line-height: 1.7; margin: 0; padding: 0; }
  h1 { text-align: center; font-size: 28px; margin-bottom: 5px; color: #1a1a1a; }
  .subtitle { text-align: center; font-size: 14px; color: #6b665e; margin-bottom: 30px; }
  .week-title { font-size: 20px; color: #a67c52; border-bottom: 2px solid #a67c52; padding-bottom: 5px; margin-top: 30px; margin-bottom: 15px; }
  .day { margin-bottom: 20px; page-break-inside: avoid; }
  .day-header { font-size: 16px; font-weight: bold; color: #1a1a1a; margin-bottom: 4px; }
  .day-title { font-size: 15px; font-weight: bold; color: #a67c52; }
  .day-desc { font-size: 13px; color: #444; margin: 4px 0; }
  .day-challenge { font-size: 13px; background: #f5f0e8; padding: 8px 12px; border-radius: 6px; margin-top: 6px; font-weight: 500; }
  .checkbox { display: inline-block; width: 14px; height: 14px; border: 1.5px solid #a67c52; border-radius: 3px; margin-right: 8px; vertical-align: middle; }
  .footer { text-align: center; margin-top: 40px; font-size: 11px; color: #999; }
  .cover { text-align: center; padding: 100px 20px 60px; page-break-after: always; }
  .cover h1 { font-size: 36px; }
  .cover .tagline { font-size: 16px; color: #a67c52; margin-top: 10px; }
  .cover .url { font-size: 13px; color: #999; margin-top: 40px; }
</style>
</head>
<body>
<div class="cover">
  <h1>30 Days of Discipline</h1>
  <p class="tagline">One small act per day. One life transformed.</p>
  <p style="margin-top:30px;font-size:14px;color:#666;">A free guide by <strong>Motiva Hub</strong></p>
  <p class="url">the-motivahub.com</p>
</div>
<h2 class="week-title">Week 1 — Foundation</h2>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 1</p><p class="day-title">Wake Up at the Same Time</p><p class="day-desc">Set one alarm. Get out of bed on the first ring. No snooze. Your day starts with discipline, not negotiation.</p><p class="day-challenge">Challenge: Wake up at 6:00 AM tomorrow. No exceptions.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 2</p><p class="day-title">Make Your Bed</p><p class="day-desc">The first small win of the day. A made bed signals: I am in control.</p><p class="day-challenge">Challenge: Make your bed within 2 minutes of waking up.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 3</p><p class="day-title">Cold Shower — 30 Seconds</p><p class="day-desc">End your shower with 30 seconds of cold water. It trains your brain to do hard things voluntarily.</p><p class="day-challenge">Challenge: Turn the water cold for the last 30 seconds.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 4</p><p class="day-title">Write 3 Things You're Grateful For</p><p class="day-desc">Discipline is not just physical. Gratitude trains your mind to see what matters. Write them by hand.</p><p class="day-challenge">Challenge: Before bed, write 3 gratitudes in a notebook.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 5</p><p class="day-title">No Phone for the First Hour</p><p class="day-desc">Your morning belongs to you, not to notifications. The first hour sets the tone for everything.</p><p class="day-challenge">Challenge: Leave your phone in another room until 7:00 AM.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 6</p><p class="day-title">10 Push-Ups</p><p class="day-desc">Discipline lives in the body. Ten push-ups is nothing — but doing them when you don't want to is everything.</p><p class="day-challenge">Challenge: Drop and do 10 push-ups right now.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 7</p><p class="day-title">Review Your Week</p><p class="day-desc">What did you do? What did you skip? Write it down. Self-awareness is the foundation of growth.</p><p class="day-challenge">Challenge: Spend 10 minutes reviewing your week honestly.</p></div>
<h2 class="week-title">Week 2 — Consistency</h2>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 8</p><p class="day-title">Eat One Healthy Meal</p><p class="day-desc">You don't need a diet. You need one good meal. Cook it, eat it slowly, notice how you feel.</p><p class="day-challenge">Challenge: Prepare and eat one nutritious meal today.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 9</p><p class="day-title">Read 10 Pages</p><p class="day-desc">Not a chapter. Not a book. Just 10 pages. Consistency beats intensity every single time.</p><p class="day-challenge">Challenge: Read 10 pages of any book before bed.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 10</p><p class="day-title">Walk 20 Minutes</p><p class="day-desc">Movement is medicine. A 20-minute walk clears your mind, strengthens your body, and builds the habit of showing up.</p><p class="day-challenge">Challenge: Walk for 20 minutes without your phone.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 11</p><p class="day-title">Say No to One Distraction</p><p class="day-desc">One notification ignored. One scroll session skipped. Every "no" to distraction is a "yes" to your future.</p><p class="day-challenge">Challenge: Identify your biggest distraction and avoid it for 2 hours.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 12</p><p class="day-title">Plan Tomorrow Tonight</p><p class="day-desc">Write down your top 3 priorities for tomorrow. Wake up with direction, not confusion.</p><p class="day-challenge">Challenge: Before bed, write your 3 priorities for tomorrow.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 13</p><p class="day-title">5 Minutes of Silence</p><p class="day-desc">Sit alone. No music. No phone. No thoughts — just observe. The mind that can be still can do anything.</p><p class="day-challenge">Challenge: Sit in complete silence for 5 minutes.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 14</p><p class="day-title">Week 2 Review</p><p class="day-desc">Two weeks in. Are you consistent? Write down what worked, what didn't, and what you'll change.</p><p class="day-challenge">Challenge: Review your progress honestly. Adjust if needed.</p></div>
<h2 class="week-title">Week 3 — Challenge</h2>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 15</p><p class="day-title">Cold Shower — 1 Minute</p><p class="day-desc">You survived 30 seconds. Now double it. Comfort is the enemy of growth.</p><p class="day-challenge">Challenge: 1 minute of cold water. Breathe through it.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 16</p><p class="day-title">No Complaining for 24 Hours</p>  <p class="day-desc">Zero complaints. Not about the weather. Not about work. Not about anything. Gratitude replaces complaining.</p><p class="day-challenge">Challenge: Go the entire day without complaining once.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 17</p><p class="day-title">20 Push-Ups + 20 Squats</p><p class="day-desc">The body is getting stronger. Prove it to yourself. Double what you did on Day 6.</p><p class="day-challenge">Challenge: 20 push-ups and 20 squats. No rest between.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 18</p><p class="day-title">Do the Thing You've Been Avoiding</p><p class="day-desc">That email. That conversation. That task. Do it today. Discipline means doing what needs to be done.</p><p class="day-challenge">Challenge: Complete the one task you've been putting off.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 19</p><p class="day-title">Eat Clean All Day</p><p class="day-desc">No junk food. No sugar. No processed food. One clean day shows you what your body is capable of.</p><p class="day-challenge">Challenge: Eat only whole foods for one full day.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 20</p><p class="day-title">Wake Up at 5:00 AM</p><p class="day-desc">You've been training for 20 days. Now wake up an hour earlier. Own the morning before the world owns you.</p><p class="day-challenge">Challenge: Alarm at 5:00 AM. Out of bed on the first ring.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 21</p><p class="day-title">Week 3 Review</p><p class="day-desc">Three weeks. You're not the same person who started. Write down how you've changed.</p><p class="day-challenge">Challenge: Journal about the person you're becoming.</p></div>
<h2 class="week-title">Week 4 — Mastery</h2>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 22</p><p class="day-title">2 Minutes of Cold Water</p><p class="day-desc">You've come this far. Two minutes is nothing now. Your mind is stronger than it was on Day 3.</p><p class="day-challenge">Challenge: 2 minutes cold shower. You've earned this.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 23</p><p class="day-title">Help Someone Today</p><p class="day-desc">Discipline is not selfish. Use your strength to lift someone else. A kind word, a helping hand, a moment of your time.</p><p class="day-challenge">Challenge: Do one act of kindness for someone else.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 24</p><p class="day-title">30 Push-Ups + 30 Squats</p><p class="day-desc">Three times what you started with. The body follows the mind. You are proof.</p><p class="day-challenge">Challenge: 30 push-ups and 30 squats. Feel the difference.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 25</p><p class="day-title">No Social Media for 24 Hours</p><p class="day-desc">One full day. No scrolling. No stories. No reels. You'll survive. You might even thrive.</p><p class="day-challenge">Challenge: Delete apps for 24 hours. Reinstall tomorrow.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 26</p><p class="day-title">Write Your Future Self a Letter</p><p class="day-desc">Where will you be in one year? Write to that person. Tell them what you started. Tell them why.</p><p class="day-challenge">Challenge: Write a letter to yourself, one year from now.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 27</p><p class="day-title">Fast Until Lunch</p><p class="day-desc">Hunger is a feeling, not an emergency. Skip breakfast. Eat at noon. Learn the difference between want and need.</p><p class="day-challenge">Challenge: Eat only after 12:00 PM.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 28</p><p class="day-title">Run or Walk 5K</p><p class="day-desc">28 days of discipline led here. Move your body for 5 kilometers. You are not who you were on Day 1.</p><p class="day-challenge">Challenge: Complete 5K — run, jog, or walk.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 29</p><p class="day-title">Teach Someone What You've Learned</p><p class="day-desc">Share one lesson from this journey with a friend, a family member, a colleague. Teaching cements learning.</p><p class="day-challenge">Challenge: Tell one person what 30 days of discipline taught you.</p></div>
<div class="day"><p class="day-header"><span class="checkbox"></span> Day 30</p><p class="day-title">Start Again — Day 1</p><p class="day-desc">You finished. But discipline has no finish line. Start again. This time, you know who you are.</p><p class="day-challenge">Challenge: Tomorrow is Day 1 again. Will you show up?</p></div>
<div class="footer"><p>30 Days of Discipline — A free guide by Motiva Hub</p><p>the-motivahub.com</p></div>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: path.join(__dirname, 'public', '30-days-discipline.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' }
  });
  await browser.close();
  console.log('PDF created successfully!');
})();
