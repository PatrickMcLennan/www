// Header animation

const headerNoun = document.querySelector("h2 > .noun");
const headerVerb = document.querySelector("h2 > .verb");

const NOUNS = [
  "TypeScript",
  "Rust",
  "Ruby on Rails",
  "React",
  "Next.js",
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

function animateNounIn() {
  const filteredNouns = NOUNS.filter((noun) => !CACHE.NOUNS.includes(noun));
  const nextNoun =
    filteredNouns[Math.floor(Math.random() * filteredNouns.length)];

  CACHE.NOUNS.push(nextNoun);

  if (CACHE.NOUNS.length > 4) {
    CACHE.NOUNS.shift();
  }

  const filteredAnimations = ANIMATIONS_IN.filter(
    (animation) => !CACHE.NOUN_ANIMATION.includes(animation)
  );
  const nextAnimation =
    filteredAnimations[Math.floor(Math.random() * filteredAnimations.length)];

  CACHE.NOUN_ANIMATION.push(nextAnimation);

  if (CACHE.NOUN_ANIMATION.length > 2) {
    CACHE.NOUN_ANIMATION.shift();
  }

  const nounOnDeck = document.createElement("div");
  headerNoun?.appendChild(nounOnDeck);

  nounOnDeck.innerHTML = nextNoun
    .split("")
    .map(
      (char) =>
        `<span class="hero-animated-char-in" style="animation-name: ${nextAnimation};">${char}</span>`
    )
    .join("");

  headerNoun?.querySelectorAll("div")?.[0]?.remove();

  const finalChar = [
    ...(headerNoun?.querySelectorAll(`div > .hero-animated-char-in`) ?? []),
  ].at(-1);

  const teeUpNextVerb = () => {
    finalChar?.removeEventListener(`animationend`, teeUpNextVerb);
    setTimeout(animateVerbOut, 1000);
  };

  finalChar?.addEventListener(`animationend`, teeUpNextVerb);
}

function animateNounOut() {
  const currentNounChars = headerNoun?.querySelectorAll(
    `div > .hero-animated-char-in`
  );

  const filteredAnimations = ANIMATIONS_OUT.filter(
    (animation) => !CACHE.NOUN_ANIMATION.includes(animation)
  );
  const nextAnimation =
    filteredAnimations[Math.floor(Math.random() * filteredAnimations.length)];

  CACHE.NOUN_ANIMATION.push(nextAnimation);

  if (CACHE.NOUN_ANIMATION.length > 2) {
    CACHE.NOUN_ANIMATION.shift();
  }

  console.log(`animateNounOut`, {
    currentNounChars,
    nextAnimation,
  });

  if (!currentNounChars?.length) {
    const currentNounLetters = headerNoun?.textContent?.split("");
    const nounOnDeck = document.createElement("div");
    nounOnDeck.innerHTML =
      currentNounLetters
        ?.map(
          (char) =>
            `<span class="hero-animated-char-out" style="animation-name: ${nextAnimation};">${char}</span>`
        )
        .join("") ?? ``;
    (headerNoun as HTMLElement).style.color = "transparent";
    headerNoun?.appendChild(nounOnDeck);
  } else {
    headerNoun
      ?.querySelector(`div`)
      ?.querySelectorAll(`.hero-animated-char-in`)
      .forEach((char) => {
        char.classList.remove("hero-animated-char-in");
        char.classList.add("hero-animated-char-out");
        (char as HTMLElement).style.animationName = nextAnimation;
      });
  }

  const finalChar = [
    ...(headerNoun?.querySelectorAll(`div > .hero-animated-char-out`) ?? []),
  ].at(-1);

  const teeUpNextNoun = () => {
    finalChar?.removeEventListener(`animationend`, teeUpNextNoun);
    animateNounIn();
  };

  finalChar?.addEventListener(`animationend`, teeUpNextNoun);
}

function animateVerbIn() {
  const filteredVerbs = VERBS.filter((noun) => !CACHE.VERBS.includes(noun));
  const nextVerb =
    filteredVerbs[Math.floor(Math.random() * filteredVerbs.length)];

  CACHE.VERBS.push(nextVerb);

  if (CACHE.VERBS.length > 4) {
    CACHE.VERBS.shift();
  }

  const filteredAnimations = ANIMATIONS_IN.filter(
    (animation) => !CACHE.VERB_ANIMATION.includes(animation)
  );

  const nextAnimation =
    filteredAnimations[Math.floor(Math.random() * filteredAnimations.length)];

  CACHE.VERB_ANIMATION.push(nextAnimation);

  if (CACHE.VERB_ANIMATION.length > 2) {
    CACHE.VERB_ANIMATION.shift();
  }

  const verbOnDeck = document.createElement("div");
  headerVerb?.appendChild(verbOnDeck);

  verbOnDeck.innerHTML = nextVerb
    .split("")
    .map(
      (char) =>
        `<span class="hero-animated-char-in" style="animation-name: ${nextAnimation};">${char}</span>`
    )
    .join("");

  const finalChar = [
    ...(headerVerb?.querySelectorAll(`div > .hero-animated-char-in`) ?? []),
  ].at(-1);

  const teeUpNextNoun = () => {
    finalChar?.removeEventListener(`animationend`, teeUpNextNoun);
    headerVerb?.querySelector("div")?.remove();
    setTimeout(animateNounOut, 1000);
  };

  finalChar?.addEventListener(`animationend`, teeUpNextNoun);
}

function animateVerbOut() {
  const currentVerbChars = headerVerb?.querySelectorAll(
    `div > .hero-animated-char-in`
  );

  const filteredAnimations = ANIMATIONS_OUT.filter(
    (animation) => !CACHE.VERB_ANIMATION.includes(animation)
  );
  const nextAnimation =
    filteredAnimations[Math.floor(Math.random() * filteredAnimations.length)];

  CACHE.VERB_ANIMATION.push(nextAnimation);

  if (CACHE.VERB_ANIMATION.length > 2) {
    CACHE.VERB_ANIMATION.shift();
  }

  if (!currentVerbChars?.length) {
    const currentVerbLetters = headerVerb?.textContent?.split("");
    const verbOnDeck = document.createElement("div");
    verbOnDeck.innerHTML =
      currentVerbLetters
        ?.map(
          (char) =>
            `<span class="hero-animated-char-out" style="animation-name: ${nextAnimation};">${char}</span>`
        )
        .join("") ?? ``;
    (headerVerb as HTMLElement).style.color = "transparent";
    headerVerb?.appendChild(verbOnDeck);
  } else {
    headerVerb
      ?.querySelector(`div`)
      ?.querySelectorAll(`.hero-animated-char-in`)
      .forEach((char) => {
        char.classList.remove("hero-animated-char-in");
        char.classList.add("hero-animated-char-out");
        (char as HTMLElement).style.animationName = nextAnimation;
      });
  }

  const finalChar = [
    ...(headerVerb?.querySelectorAll(`div > .hero-animated-char-out`) ?? []),
  ].at(-1);

  const teeUpNextVerb = () => {
    finalChar?.removeEventListener(`animationend`, teeUpNextVerb);
    animateVerbIn();
  };

  finalChar?.addEventListener(`animationend`, teeUpNextVerb);
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
  const firstChild = technologiesCardContent?.children[0];
  if (firstChild) {
    technologiesCardContent?.removeChild(technologiesCardContent?.children[0]);
  }

  const newContent = document.createElement("div");
  newContent.id = id;
  newContent.className = `content-details`;
  technologiesCardContent?.appendChild(newContent);
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
