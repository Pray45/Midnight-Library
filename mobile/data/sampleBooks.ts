export interface BookPage {
  pageNumber: number;
  chapterTitle?: string;
  isChapterStart?: boolean;
  content: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  subtitle: string;
  cover: string;
  totalPages: number;
  chapters: { title: string; startPage: number }[];
  pages: BookPage[];
}

export const SAMPLE_BOOKS: BookItem[] = [
  {
    id: 'midnight-library',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    subtitle: 'Between life and death there is a library...',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    totalPages: 8,
    chapters: [
      { title: 'Chapter 1: A Conversation About Rain', startPage: 1 },
      { title: 'Chapter 2: Nineteen Hours Later', startPage: 3 },
      { title: 'Chapter 3: The Library of Infinite Lives', startPage: 5 },
      { title: 'Chapter 4: The Book of Regrets', startPage: 7 },
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Chapter 1: A Conversation About Rain',
        isChapterStart: true,
        content: `Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.

To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?

Nora Seed found herself standing in a room painted the muted shade of twilight. The air smelled faintly of old paper and dried lavender.`,
      },
      {
        pageNumber: 2,
        chapterTitle: 'Chapter 1: A Conversation About Rain',
        content: `Mrs. Elm sat behind a dark oak desk, her fingers resting lightly on the surface of a chessboard.

"Welcome, Nora," Mrs. Elm said with a warm, knowing smile. "You are somewhere between life and death. Every book on these shelves represents a version of your existence that branched off from a single decision."

Nora looked down at her hands. They seemed slightly translucent against the amber light.`,
      },
      {
        pageNumber: 3,
        chapterTitle: 'Chapter 2: Nineteen Hours Later',
        isChapterStart: true,
        content: `The clock on the wall read 00:00:00. The hands did not move, yet time felt like a river rushing past beneath her feet.

"If you could step into a life where you never gave up swimming," Mrs. Elm asked softly, "would you take it?"

Nora reached out toward a heavy green volume embossed with gold lettering. Her fingertips tingled as they touched the leather spine.`,
      },
      {
        pageNumber: 4,
        chapterTitle: 'Chapter 2: Nineteen Hours Later',
        content: `As her fingers pressed against the cover, the library began to dissolve around her. The smell of dust gave way to the crisp chlorine of an Olympic training pool.

Suddenly she was standing at the edge of Lane 4, breathing hard into a pair of fogged goggles, surrounded by the roar of five thousand cheering spectators.

She looked down at her swimsuit. She was twenty-four again.`,
      },
      {
        pageNumber: 5,
        chapterTitle: 'Chapter 3: The Library of Infinite Lives',
        isChapterStart: true,
        content: `Every life has millions of decisions. Some big, some small. But every time one choice is made over another, the outcome differs. An irreversible variation, which in turn causes further variations.

"The secret to happiness," Mrs. Elm murmured as the library reappeared around them, "is not in avoiding mistakes, but in discovering what truly makes your heart beat."

Nora flipped through the pages of a small blue booklet titled *The Music We Never Made*.`,
      },
      {
        pageNumber: 6,
        chapterTitle: 'Chapter 3: The Library of Infinite Lives',
        content: `In this life, the band she started with her brother had never broken up. They were headlining arena tours across South America.

Yet when she looked in the mirror backstage, the reflection showed eyes tired from sleepless night after night in hotel rooms, distant from the quiet joy she longed for.

"I see," Nora whispered. "Success isn't the same as fulfillment."`,
      },
      {
        pageNumber: 7,
        chapterTitle: 'Chapter 4: The Book of Regrets',
        isChapterStart: true,
        content: `The heaviest book in the Midnight Library was bound in thick black velvet. It contained every single regret Nora had ever logged in her mind.

"Notice how light it gets when you stop holding onto what was never yours to carry," Mrs. Elm advised gently.

Nora watched as page after page of complaints dissolved into delicate wisps of silver smoke.`,
      },
      {
        pageNumber: 8,
        chapterTitle: 'Chapter 4: The Book of Regrets',
        content: `The library began to glow with a dazzling golden radiance. The shelves receded into the distance, leaving only a open door framed in warm light.

"It is easy to wish we were someone else," Nora realized. "The hard part is learning to inhabit the life that is already ours."

She stepped through the doorway into the morning sun.`,
      },
    ],
  },
  {
    id: 'alice-in-wonderland',
    title: "Alice's Adventures in Wonderland",
    author: 'Lewis Carroll',
    subtitle: 'Down the rabbit-hole into a world of wonder...',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
    totalPages: 6,
    chapters: [
      { title: 'Chapter I: Down the Rabbit-Hole', startPage: 1 },
      { title: 'Chapter II: The Pool of Tears', startPage: 3 },
      { title: 'Chapter III: A Caucus-Race and a Long Tale', startPage: 5 },
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Chapter I: Down the Rabbit-Hole',
        isChapterStart: true,
        content: `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it.

"And what is the use of a book," thought Alice, "without pictures or conversations?"

So she was considering in her own mind whether the pleasure of making a daisy-chain would be worth the trouble of getting up when suddenly a White Rabbit with pink eyes ran close by her.`,
      },
      {
        pageNumber: 2,
        chapterTitle: 'Chapter I: Down the Rabbit-Hole',
        content: `There was nothing so VERY remarkable in that; nor did Alice think it so VERY much out of the way to hear the Rabbit say to itself, "Oh dear! Oh dear! I shall be late!"

But when the Rabbit actually TOOK A WATCH OUT OF ITS WASTECOAT-POCKET, and looked at it, and then hurried on, Alice started to her feet.

She flashed across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.`,
      },
      {
        pageNumber: 3,
        chapterTitle: 'Chapter II: The Pool of Tears',
        isChapterStart: true,
        content: `"Curiouser and curiouser!" cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English).

"Now I'm opening out like the largest telescope that ever was! Good-bye, feet!"

She looked down at her feet, and they seemed to be almost out of sight, they were getting so far off.`,
      },
      {
        pageNumber: 4,
        chapterTitle: 'Chapter II: The Pool of Tears',
        content: `Poor Alice! She sat down and began to cry again.

"You ought to be ashamed of yourself," said Alice, "a great girl like you, to go on crying in this way! Stop this moment, I tell you!"

But she went on all the same, shedding gallons of tears, until there was a large pool all round her, about four inches deep.`,
      },
      {
        pageNumber: 5,
        chapterTitle: 'Chapter III: A Caucus-Race',
        isChapterStart: true,
        content: `They were indeed a queer-looking party that assembled on the bank—the birds with draggled feathers, the animals with their fur clinging close to them, and all dripping wet, cross, and uncomfortable.

The first question of course was, how to get dry again: they had a consultation about this, and after a few minutes it seemed quite natural to Alice to find herself talking familiarly with them.`,
      },
      {
        pageNumber: 6,
        chapterTitle: 'Chapter III: A Caucus-Race',
        content: `"What I was going to say," said the Dodo in an offended tone, "was, that the best thing to get us dry would be a Caucus-race."

"What IS a Caucus-race?" said Alice.

"Why," said the Dodo, "the best way to explain it is to do it." And as the Dodo marked out a race-course, Alice knew her journey had only just begun.`,
      },
    ],
  },
];

export interface BookTheme {
  id: string;
  name: string;
  bg: string;
  cardBg: string;
  coverBorder: string;
  text: string;
  subtext: string;
  accent: string;
  border: string;
  spineShadow: string;
  pageEdge: string;
  dropCapBg: string;
  dropCapText: string;
}

export const BOOK_THEMES: BookTheme[] = [
  {
    id: 'midnight-library',
    name: 'Midnight Library Signature',
    bg: '#fef7ec',
    cardBg: '#fffdf9',
    coverBorder: '#1c1917',
    text: '#1c1917',
    subtext: '#78716c',
    accent: '#f59e0b',
    border: '#1c1917',
    spineShadow: 'rgba(28, 25, 23, 0.15)',
    pageEdge: '#f5e6d3',
    dropCapBg: '#ffe3bf',
    dropCapText: '#ea580c',
  },
  {
    id: 'sepia',
    name: 'Vintage Parchment',
    bg: '#F5EFE0',
    cardBg: '#FFFDF6',
    coverBorder: '#5C4033',
    text: '#3E2C1C',
    subtext: '#7A6452',
    accent: '#D97706',
    border: '#D4C5A9',
    spineShadow: 'rgba(62, 44, 28, 0.25)',
    pageEdge: '#E6DBB8',
    dropCapBg: '#F3E5C8',
    dropCapText: '#8B4513',
  },
  {
    id: 'midnight-dark',
    name: 'Midnight Dark',
    bg: '#0B1120',
    cardBg: '#151D30',
    coverBorder: '#1E293B',
    text: '#F1F5F9',
    subtext: '#94A3B8',
    accent: '#F59E0B',
    border: '#2A364F',
    spineShadow: 'rgba(0, 0, 0, 0.65)',
    pageEdge: '#26334A',
    dropCapBg: '#2A3752',
    dropCapText: '#F59E0B',
  },
  {
    id: 'cream',
    name: 'Classic Cream',
    bg: '#FAF8F5',
    cardBg: '#FFFFFF',
    coverBorder: '#1F2937',
    text: '#111827',
    subtext: '#6B7280',
    accent: '#2563EB',
    border: '#E5E7EB',
    spineShadow: 'rgba(17, 24, 39, 0.15)',
    pageEdge: '#EFECE6',
    dropCapBg: '#F3F4F6',
    dropCapText: '#1E40AF',
  },
  {
    id: 'emerald',
    name: 'Royal Emerald',
    bg: '#04221A',
    cardBg: '#0B3529',
    coverBorder: '#064E3B',
    text: '#ECFDF5',
    subtext: '#6EE7B7',
    accent: '#10B981',
    border: '#165B47',
    spineShadow: 'rgba(4, 34, 26, 0.55)',
    pageEdge: '#134D3C',
    dropCapBg: '#144D3C',
    dropCapText: '#34D399',
  },
];
