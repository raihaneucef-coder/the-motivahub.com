import { test, expect } from '@playwright/test';

test.describe('Visual layout verification', () => {
  test('about page layout check', async ({ page }) => {
    await page.goto('https://the-motivahub.com/about/');
    await page.waitForTimeout(2000);
    
    // Check author photo alignment
    const authorPhoto = await page.locator('.article-img').first();
    const photoBox = await authorPhoto.boundingBox();
    console.log('About page photo box:', photoBox);
    
    // Check text alignment
    const bodyText = await page.locator('.article-body').first();
    const bodyBox = await bodyText.boundingBox();
    console.log('About page body box:', bodyBox);
    
    await page.screenshot({ path: 'tests/screenshots/about-layout-debug.png', fullPage: true });
  });

  test('books page layout check', async ({ page }) => {
    await page.goto('https://the-motivahub.com/books/');
    await page.waitForTimeout(2000);
    
    // Check book card layout
    const bookCard = await page.locator('.book-card').first();
    const cardBox = await bookCard.boundingBox();
    console.log('Book card box:', cardBox);
    
    // Check text alignment in book cards
    const bookTitle = await bookCard.locator('h3').first();
    const titleBox = await bookTitle.boundingBox();
    console.log('Book title box:', titleBox);
    
    // Check if text is centered incorrectly
    const bookBody = await bookCard.locator('.book-body').first();
    const bodyBox = await bookBody.boundingBox();
    console.log('Book body box:', bodyBox);
    
    await page.screenshot({ path: 'tests/screenshots/books-layout-debug.png', fullPage: true });
  });

  test('journal page layout check', async ({ page }) => {
    await page.goto('https://the-motivahub.com/journal/');
    await page.waitForTimeout(2000);
    
    // Check article card image alignment
    const articleCard = await page.locator('.card').first();
    const cardBox = await articleCard.boundingBox();
    console.log('Journal card box:', cardBox);
    
    const articleImg = await articleCard.locator('.card-img').first();
    const imgBox = await articleImg.boundingBox();
    console.log('Journal article img box:', imgBox);
    
    await page.screenshot({ path: 'tests/screenshots/journal-layout-debug.png', fullPage: true });
  });
});
