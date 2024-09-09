export const logo = require('../assets/binary-top.png');
export const cross = require('../assets/white-cross.png');
export const play = require('../assets/play.png');
export const pause = require('../assets/pause.png');
export const mute = require('../assets/muted.png');
export const unmute = require('../assets/sound.png');
export const clock = require('../assets/clock.png');

export const stories = [
  {
    id: '1',
    items: [
      // {
      //   type: 'image',
      //   image: require('../assets/asia.png'),
      // },
      // {
      //   type: 'image',
      //   image: require('../assets/coding.png'),
      // },
      // {
      //   type: 'image',
      //   image: require('../assets/deer.png'),
      // },
      {
        type: 'image',
        image: require('../assets/mountain.png'),
      },
      {
        type: 'video',
        // video: require('../assets/fast.mp4'),
        video:
          'https://app.onemor.com/api/playlists/01j6hq2fq64m1qzdq2yytz8kat.m3u8',
      },
      {
        type: 'video',
        // video: require('../assets/stock.mp4'),
        video:
          'https://app.onemor.com/api/playlists/01j6ht7x9fw77z6tarbj753dn0.m3u8',
      },
      {
        type: 'video',
        // video: require('../assets/sea.mp4'),
        video:
          'https://app.onemor.com/api/playlists/01j6htc175vbeg4gk9ewkaagwq.m3u8',
      },
      // {
      //   type: 'lottie',
      //   lottie: require('../assets/loading.json'),
      // },
    ],
  },
  {
    id: '2',
    items: [
      {
        type: 'image',
        image: require('../assets/asia.png'),
      },
    ],
  },
  {
    id: '3',
    items: [
      {
        type: 'image',
        image: require('../assets/asia.png'),
      },
    ],
  },
  {
    id: '4',
    items: [
      {
        type: 'image',
        image: require('../assets/asia.png'),
      },
    ],
  },
  {
    id: '5',
    items: [
      {
        type: 'image',
        image: require('../assets/asia.png'),
      },
    ],
  },
];

export type FlatlistItem = {
  id: number;
  stories: Stories[];
};

export type Stories = {
  type: string;
  image?: string;
  video?: string;
  lottie?: string;
};

export type StoryComponentProps = {
  onFinishStory?: () => void;
  stories: Stories[];
  scrollTo: (workoutIdx: number) => void;
  isVisible: boolean;
  workoutIndex?: number;
};
