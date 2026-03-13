import { test, expect } from "@playwright/test";

test.describe("Quiz", () => {
  const quizTitle = "Eesti sümbolid ja kultuur";

  const correctAnswers = {
    "Mis värvid on Eesti lipul?": "Sinine, must ja valge",
    "Mis on Eesti pealinn?": "Tallinn",
    "Milline lind on Eesti rahvuslind?": "Suitsupääsuke",
    "Milline lill on Eesti rahvuslill?": "Rukkilill",
    "Mis kuupäeval tähistatakse Eesti iseseisvuspäeva?": "24. veebruaril",
    "Millises linnas toimub tuntud laulu- ja tantsupidu?": "Tallinnas",
    "Mis oli Eesti raha enne euro kasutuselevõttu?": "Kroon",
    "Mis aastal võeti Eestis kasutusele euro?": "2011",
    "Kes kirjutas Eesti rahvuseepose „Kalevipoeg”?":
      "Friedrich Reinhold Kreutzwald",
  };

  const wrongAnswers = {
    "Mis värvid on Eesti lipul?": "Punane, valge ja sinine",
    "Mis on Eesti pealinn?": "Tartu",
    "Milline lind on Eesti rahvuslind?": "Kurg",
    "Milline lill on Eesti rahvuslill?": "Roos",
    "Mis kuupäeval tähistatakse Eesti iseseisvuspäeva?": "23. juunil",
    "Millises linnas toimub tuntud laulu- ja tantsupidu?": "Narvas",
    "Mis oli Eesti raha enne euro kasutuselevõttu?": "Mark",
    "Mis aastal võeti Eestis kasutusele euro?": "2010",
    "Kes kirjutas Eesti rahvuseepose „Kalevipoeg”?": "Lydia Koidula",
  };

  async function openQuiz(page) {
    await page.goto("/");
    await page.getByText(quizTitle).click();
    await page.getByTestId("start-quiz").click();
  }

  async function answerCurrentQuestion(page, answerMap) {
    const questionText = await page.getByTestId("question-text").textContent();
    const answer = answerMap[questionText.trim()];

    expect(
      answer,
      `No mapped answer for question: ${questionText}`,
    ).toBeTruthy();

    await page.getByText(answer, { exact: true }).click();
  }

  test("quiz page is being opened", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Viktoriinid")).toBeVisible();
    await expect(page.getByText("Vali viktoriin")).toBeVisible();
    await expect(page.getByText(quizTitle)).toBeVisible();
  });

  test("shows correct feedback after answering with the correct option", async ({
    page,
  }) => {
    await openQuiz(page);

    await answerCurrentQuestion(page, correctAnswers);

    await expect(page.getByTestId("answer-feedback-correct")).toBeVisible();
  });

  test("updates the score after a correct answer", async ({ page }) => {
    await openQuiz(page);

    await expect(page.getByText("Punktid: 0")).toBeVisible();

    await answerCurrentQuestion(page, correctAnswers);

    const scoreText = await page.locator("text=Punktid:").textContent();
    expect(scoreText).toMatch(/Punktid:\s(10|15)/);
  });

  test("shows the next question button after answering", async ({ page }) => {
    await openQuiz(page);

    await answerCurrentQuestion(page, correctAnswers);

    await expect(page.getByTestId("next-question")).toBeVisible();
  });

  test("shows wrong answer feedback and keeps score unchanged", async ({
    page,
  }) => {
    await openQuiz(page);

    await answerCurrentQuestion(page, wrongAnswers);

    await expect(page.getByTestId("answer-feedback-wrong")).toBeVisible();
    await expect(page.getByText("Punktid: 0")).toBeVisible();
  });

  test("shows the final result after answering all questions correctly", async ({
    page,
  }) => {
    await openQuiz(page);

    for (let i = 0; i < 9; i++) {
      await answerCurrentQuestion(page, correctAnswers);
      await page.getByTestId("next-question").click();
    }

    await expect(page.getByTestId("quiz-results")).toBeVisible();
    await expect(page.getByText("Viktoriin lõppenud!")).toBeVisible();
    await expect(page.getByText("Said 100 punkti 100-st")).toBeVisible();
  });
});
