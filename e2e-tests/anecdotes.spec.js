import { test, expect } from '@playwright/test'

test.describe('Anecdotes', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('')
    await expect(page.getByText('Anecdotes')).toBeVisible()
    await expect(page.getByText('If it hurts, do it more often')).toBeVisible()
  })

  test('a new anecdote can be created', async ({ page }) => {
    await page.goto('')
    const input = page.locator('input[name="anecdote"]')
    await input.fill('Playwright tests make CI pipelines reliable')
    await page.getByRole('button', { name: 'create' }).click()
    await expect(page.getByText('Playwright tests make CI pipelines reliable', { exact: true })).toBeVisible()
  })

  test('an anecdote can be voted on', async ({ page }) => {
    await page.goto('')
    const firstVoteButton = page.getByRole('button', { name: 'vote' }).first()
    await firstVoteButton.click()
    await expect(page.getByText(/you voted '/)).toBeVisible()
  })
})
