// Header animation

const headerNoun = document.querySelector("h2 > .noun");
const headerVerb = document.querySelector("h2 > .verb");

const NOUNS = [
  "TypeScript",
  "Rust",
  "Ruby on Rails",
  "React",
  "Kafka",
  "Node.js",
  "Docker",
  "AWS",
  "GCP",
  "PostgreSQL",
  "MySQL",
  "DynamoDB",
  "Redis",
  "ElasticSearch",
  "Grafana",
  "GraphQL",
];

const VERBS = [
  "performant",
  "scalable",
  "accessible",
  "reliable",
  "resilient",
  "Healthcare",
  "collaborative",
  "E-commerce",
  "observable",
  "fun!",
  "automated",
];

const ANIMATIONS_IN = [
  "hero-char-scroll-in",
  "hero-char-grow-in",
  "hero-char-blur-in",
  "hero-char-shrink-in",
];
const ANIMATIONS_OUT = [
  "hero-char-scroll-out",
  "hero-char-grow-out",
  "hero-char-blur-out",
  "hero-char-shrink-out",
];

let CACHE = {
  NOUNS: [NOUNS[0]],
  VERBS: [VERBS[0]],
  NOUN_ANIMATION: [] as string[],
  VERB_ANIMATION: [] as string[],
};

function maintainAnimationCache(
  animations: string[],
  cache: string[],
  cacheLimit: number = 2
): string {
  const filteredAnimations = animations.filter(
    (animation) => !cache.includes(animation)
  );
  const nextAnimation =
    filteredAnimations[Math.floor(Math.random() * filteredAnimations.length)];

  cache.push(nextAnimation);
  if (cache.length > cacheLimit) {
    cache.shift();
  }

  return nextAnimation;
}

function animateElementIn(
  element: Element | null,
  options: {
    words: string[];
    cache: string[];
    cacheLimit?: number;
    animationCache: string[];
    onComplete?: () => void;
  }
) {
  const { words, cache, cacheLimit = 4, animationCache, onComplete } = options;

  const filteredWords = words.filter((word) => !cache.includes(word));
  const nextWord =
    filteredWords[Math.floor(Math.random() * filteredWords.length)];

  cache.push(nextWord);
  if (cache.length > cacheLimit) {
    cache.shift();
  }

  // Get next animation
  const nextAnimation = maintainAnimationCache(ANIMATIONS_IN, animationCache);

  // Create and append new element
  const elementOnDeck = document.createElement("div");
  element?.appendChild(elementOnDeck);

  elementOnDeck.innerHTML = nextWord
    .split("")
    .map(
      (char) =>
        `<span class="hero-animated-char-in" style="animation-name: ${nextAnimation};">${
          char === " " ? "&nbsp;" : char
        }</span>`
    )
    .join("");

  // Remove previous element if it exists
  element?.querySelectorAll("div")?.[0]?.remove();

  // Setup completion handler
  const finalChar = [
    ...(element?.querySelectorAll(`div > .hero-animated-char-in`) ?? []),
  ].at(-1);
  if (onComplete && finalChar) {
    const completeHandler = () => {
      finalChar.removeEventListener(`animationend`, completeHandler);
      onComplete();
    };
    finalChar.addEventListener(`animationend`, completeHandler);
  }

  return nextWord;
}

// Simplified animateNounIn
function animateNounIn() {
  const nextNoun = animateElementIn(headerNoun, {
    words: NOUNS,
    cache: CACHE.NOUNS,
    animationCache: CACHE.NOUN_ANIMATION,
    onComplete: () => setTimeout(animateVerbOut, 1000),
  });

  // Update button state
  const button = document.querySelector(`button#${nextNoun}`);
  button?.classList.add("currentNoun");
}

// Simplified animateVerbIn
function animateVerbIn() {
  animateElementIn(headerVerb, {
    words: VERBS,
    cache: CACHE.VERBS,
    animationCache: CACHE.VERB_ANIMATION,
    onComplete: () => {
      setTimeout(animateNounOut, 1000);
    },
  });
}

function animateElementOut(
  element: Element | null,
  options: {
    animationCache: string[];
    onComplete?: () => void;
    extraCleanup?: () => void;
  }
) {
  const { animationCache, onComplete, extraCleanup } = options;
  const currentChars = element?.querySelectorAll(
    `div > .hero-animated-char-in`
  );
  const nextAnimation = maintainAnimationCache(ANIMATIONS_OUT, animationCache);

  if (!currentChars?.length) {
    const currentLetters = element?.textContent?.split("");
    const elementOnDeck = document.createElement("div");
    elementOnDeck.innerHTML =
      currentLetters
        ?.map(
          (char) =>
            `<span class="hero-animated-char-out" style="animation-name: ${nextAnimation};">${char}</span>`
        )
        .join("") ?? ``;
    (element as HTMLElement).style.color = "transparent";
    element?.appendChild(elementOnDeck);
  } else {
    element
      ?.querySelector(`div`)
      ?.querySelectorAll(`.hero-animated-char-in`)
      .forEach((char) => {
        char.classList.remove("hero-animated-char-in");
        char.classList.add("hero-animated-char-out");
        (char as HTMLElement).style.animationName = nextAnimation;
      });
  }

  const finalChar = [
    ...(element?.querySelectorAll(`div > .hero-animated-char-out`) ?? []),
  ].at(-1);

  if (finalChar && onComplete) {
    const completeHandler = () => {
      finalChar.removeEventListener(`animationend`, completeHandler);
      extraCleanup?.();
      onComplete();
    };
    finalChar.addEventListener(`animationend`, completeHandler);
  }
}

function animateNounOut() {
  animateElementOut(headerNoun, {
    animationCache: CACHE.NOUN_ANIMATION,
    onComplete: animateNounIn,
    extraCleanup: () => {
      const button = document.querySelector(
        `.hero-card > .button-group > .currentNoun`
      );
      button?.classList.remove("currentNoun");
    },
  });
}

function animateVerbOut() {
  animateElementOut(headerVerb, {
    animationCache: CACHE.VERB_ANIMATION,
    onComplete: animateVerbIn,
  });
}

setTimeout(animateNounOut, 1000);

// Technologies card

const technologiesCard = document.querySelector(".hero-card");
const technologiesCardContent = technologiesCard?.querySelector(".content");
const technologiesCardButtonGroup =
  technologiesCard?.querySelector(".button-group");

const technologiesCardButtonGroupButtons =
  technologiesCardButtonGroup?.querySelectorAll("button");

function changeContent(id: string) {
  const newDetails = technologiesCardContent?.querySelector(
    `h3[data-tech="${id}"]`
  );
  technologiesCardContent
    ?.querySelector(`h3[aria-hidden="false"]`)
    ?.setAttribute(`aria-hidden`, `true`);
  newDetails?.setAttribute(`aria-hidden`, `false`);
}

technologiesCardButtonGroupButtons?.forEach((button) => {
  button.addEventListener("click", function () {
    technologiesCardButtonGroup
      ?.querySelector("button[aria-selected='true']")
      ?.setAttribute("aria-selected", "false");
    this.setAttribute("aria-selected", "true");
    changeContent(this.id);
  });
});
