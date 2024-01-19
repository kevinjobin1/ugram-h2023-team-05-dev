/**
 * @module types/Filter
 * @category Filter Types
 * @description Picture Filters for the Ugram App
 */

export type FilterName =
  | 'Normal'
  | '1977'
  | 'Aden'
  | 'Amaro'
  | 'Ashby'
  | 'Brannan'
  | 'Brooklyn'
  | 'Charmes'
  | 'Clarendon'
  | 'Crema'
  | 'Dogpatch'
  | 'Earlybird'
  | 'Gingham'
  | 'Ginza'
  | 'Hefe'
  | 'Helena'
  | 'Hudson'
  | 'Inkwell'
  | 'Juno'
  | 'Kelvin'
  | 'Lark'
  | 'Lo-Fi'
  | 'Ludwig'
  | 'Maven'
  | 'Mayfair'
  | 'Moon'
  | 'Nashville'
  | 'Perpetua'
  | 'Poprocket'
  | 'Reyes'
  | 'Rise'
  | 'Sierra'
  | 'Skyline'
  | 'Slumber'
  | 'Stinson'
  | 'Sutro'
  | 'Toaster'
  | 'Valencia'
  | 'Vesper'
  | 'Walden'
  | 'Willow'
  | 'X-Pro II';

export const DEFAULT_FILTER_OPTIONS = {
  blur: '0px',
  brightness: '100%',
  contrast: '100%',
  grayscale: '0%',
  'hue-rotate': '0deg',
  invert: '0%',
  opacity: '100%',
  saturate: '100%',
  sepia: '0%',
  background: 'rgba(0, 0, 0, 0)',
  'mix-blend-mode': 'normal',
};

export type Filter = {
  [key in FilterAttribute]: string;
};

export type FilterAttribute =
  | 'blur'
  | 'brightness'
  | 'contrast'
  | 'grayscale'
  | 'hue-rotate'
  | 'invert'
  | 'opacity'
  | 'saturate'
  | 'sepia'
  | 'background'
  | 'mix-blend-mode';

export type FilterAttributeValue = {
  min: number;
  max: number;
  step: number;
  default: number;
  unit: '%' | 'px' | 'deg' | '';
};

export const filterAttributes: Map<FilterAttribute, FilterAttributeValue> = new Map([
  ['blur', { min: 0, max: 10, step: 0.1, default: 0, unit: 'px' }],
  ['brightness', { min: 0, max: 200, step: 1, default: 100, unit: '%' }],
  ['contrast', { min: 0, max: 200, step: 1, default: 100, unit: '%' }],
  ['grayscale', { min: 0, max: 100, step: 1, default: 0, unit: '%' }],
  ['hue-rotate', { min: 0, max: 360, step: 1, default: 0, unit: 'deg' }],
  ['invert', { min: 0, max: 100, step: 1, default: 0, unit: '%' }],
  ['opacity', { min: 0, max: 100, step: 1, default: 100, unit: '%' }],
  ['saturate', { min: 0, max: 200, step: 1, default: 100, unit: '%' }],
  ['sepia', { min: 0, max: 100, step: 1, default: 0, unit: '%' }],
  ['background', { min: 0, max: 0, step: 0, default: 0, unit: '' }],
  ['mix-blend-mode', { min: 0, max: 0, step: 0, default: 0, unit: '' }],
]);

export const filters: Map<FilterName, Filter> = new Map([
  [
    'Normal',
    {
      ...DEFAULT_FILTER_OPTIONS,
    },
  ], // No filter
  [
    '1977',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '30%',
      'hue-rotate': '-30deg',
      saturate: '140%',
    },
  ],
  [
    'Aden',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '20%',
      brightness: '115%',
      saturate: '140%',
      background: 'rgba(125, 105, 24, 0.1)',
      'mix-blend-mode': 'multiply',
    },
  ],
  [
    'Amaro',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '35%',
      contrast: '110%',
      brightness: '120%',
      saturate: '130%',
      background: 'rgba(125, 105, 24, 0.2)',
      'mix-blend-mode': 'overlay',
    },
  ],
  [
    'Ashby',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '50%',
      contrast: '120%',
      saturate: '180%',
      background: 'rgba(125, 105, 24, 0.35)',
      'mix-blend-mode': 'lighten',
    },
  ],
  [
    'Brannan',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '40%',
      contrast: '125%',
      brightness: '110%',
      saturate: '90%',
      'hue-rotate': '-2deg',
    },
  ],
  [
    'Brooklyn',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '25%',
      contrast: '125%',
      brightness: '125%',
      'hue-rotate': '5deg',
      background: 'rgba(127, 187, 227, 0.2)',
      'mix-blend-mode': 'overlay',
    },
  ],
  [
    'Charmes',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '25%',
      contrast: '125%',
      brightness: '125%',
      saturate: '135%',
      'hue-rotate': '-5deg',
      background: 'rgba(125, 105, 24, 0.25)',
      'mix-blend-mode': 'darken',
    },
  ],
  [
    'Clarendon',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '15%',
      contrast: '125%',
      brightness: '125%',
      'hue-rotate': '5deg',
      background: 'rgba(127, 187, 227, 0.4)',
      'mix-blend-mode': 'overlay',
    },
  ],
  [
    'Crema',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '50%',
      contrast: '125%',
      brightness: '115%',
      saturate: '90%',
      'hue-rotate': '-2deg',
      background: 'rgba(125, 105, 24, 0.2)',
      'mix-blend-mode': 'multiply',
    },
  ],
  [
    'Dogpatch',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '35%',
      saturate: '110%',
      contrast: '150%',
    },
  ],
  [
    'Earlybird',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '25%',
      contrast: '125%',
      brightness: '115%',
      saturate: '90%',
      'hue-rotate': '-5deg',
      background:
        'radial-gradient(circle closest-corner, transparent 0, rgba(125, 105, 24, 0.2) 100%)',
      'mix-blend-mode': 'overlay',
    },
  ],
  [
    'Gingham',
    {
      ...DEFAULT_FILTER_OPTIONS,
      contrast: '110%',
      brightness: '110%',
      background: '#e6e6e6',
      'mix-blend-mode': 'soft-light',
    },
  ],
  [
    'Ginza',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '25%',
      contrast: '115%',
      brightness: '120%',
      saturate: '135%',
      'hue-rotate': '-5deg',
      background: 'rgba(125, 105, 24, 0.15)',
      'mix-blend-mode': 'darken',
    },
  ],
  [
    'Hefe',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '40%',
      contrast: '150%',
      brightness: '120%',
      saturate: '140%',
      'hue-rotate': '-10deg',
      background:
        'radial-gradient(circle closest-corner, transparent 0, rgba(0, 0, 0, 0.25) 100%)',
      'mix-blend-mode': 'multiply',
    },
  ],
  [
    'Helena',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '50%',
      contrast: '105%',
      brightness: '105%',
      saturate: '135%',
      background: 'rgba(158, 175, 30, 0.25)',
      'mix-blend-mode': 'overlay',
    },
  ],
  [
    'Hudson',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '25%',
      contrast: '120%',
      brightness: '120%',
      saturate: '105%',
      'hue-rotate': '-15deg',
      background:
        'radial-gradient(circle closest-corner, transparent 25%, rgba(25, 62, 167, 0.25) 100%)',
      'mix-blend-mode': 'multiply',
    },
  ],
  [
    'Inkwell',
    {
      ...DEFAULT_FILTER_OPTIONS,
      brightness: '125%',
      contrast: '85%',
      grayscale: '100%',
    },
  ],
  [
    'Juno',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '35%',
      contrast: '115%',
      brightness: '115%',
      saturate: '180%',
      background: 'rgba(127,187,227,.2)',
      'mix-blend-mode': 'overlay',
    },
  ],
  [
    'Kelvin',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '15%',
      contrast: '150%',
      brightness: '110%',
      'hue-rotate': '-10deg',
      background:
        'radial-gradient(circle closest-corner,rgba(128,78,15,.25) 0,rgba(128,78,15,.5) 100%)',
      'mix-blend-mode': 'multiply',
    },
  ],
  [
    'Lark',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '25%',
      contrast: '120%',
      brightness: '130%',
      saturate: '125%',
    },
  ],
  [
    'Lo-Fi',
    {
      ...DEFAULT_FILTER_OPTIONS,
      saturate: '110%',
      contrast: '150%',
    },
  ],
  [
    'Ludwig',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '25%',
      contrast: '105%',
      brightness: '105%',
      saturate: '200%',
      background: 'rgba(125,105,24,0.1)',
      'mix-blend-mode': 'overlay',
    },
  ],
  [
    'Maven',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '35%',
      contrast: '105%',
      brightness: '105%',
      saturate: '175%',
      background: 'rgba(158,175,30,0.25)',
      'mix-blend-mode': 'darken',
    },
  ],
  [
    'Mayfair',
    {
      ...DEFAULT_FILTER_OPTIONS,
      contrast: '110%',
      brightness: '115%',
      saturate: '110%',
      background:
        'radial-gradient(circle closest-corner, transparent 0, rgba(175,105,24,0.4) 100%)',
      'mix-blend-mode': 'multiply',
    },
  ],
  [
    'Moon',
    {
      ...DEFAULT_FILTER_OPTIONS,
      brightness: '140%',
      contrast: '95%',
      saturate: '0%',
      sepia: '35%',
    },
  ],
  [
    'Nashville',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '25%',
      contrast: '150%',
      brightness: '90%',
      'hue-rotate': '-15deg',
      background:
        'radial-gradient(circle closest-corner, rgba(128,78,15,0.5) 0, rgba(128,78,15,0.75) 100%)',
      'mix-blend-mode': 'screen',
    },
  ],
  [
    'Perpetua',
    {
      ...DEFAULT_FILTER_OPTIONS,
      contrast: '110%',
      brightness: '125%',
      saturate: '110%',
      background:
        'linear-gradient(to bottom, rgba(0,91,154,0.25), rgba(230,193,61,0.25))',
      'mix-blend-mode': 'multiply',
    },
  ],
  [
    'Poprocket',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '15%',
      brightness: '120%',
      background:
        'radial-gradient(circle closest-corner, rgba(206, 39, 70, 0.75) 40%, rgba(255,255,255,0) 80%)',
    },
  ],
  [
    'Reyes',
    {
      ...DEFAULT_FILTER_OPTIONS,
      brightness: '110%',
      contrast: '100%',
      background: 'rgba(51,51,51,.1)',
      'mix-blend-mode': 'soft-light',
    },
  ],
  [
    'Rise',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '30%',
      contrast: '90%',
      brightness: '120%',
      background:
        'radial-gradient(circle closest-corner, rgba(255,170,0,.4) 0, rgba(255,255,255,0) 70%)',
    },
  ],
  [
    'Sierra',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '25%',
      contrast: '150%',
      brightness: '90%',
      'hue-rotate': '-15deg',
      background:
        'radial-gradient(circle closest-corner, rgba(128,78,15,.5) 0, rgba(0,0,0,.65) 100%)',
      'mix-blend-mode': 'screen',
    },
  ],
  [
    'Skyline',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '15%',
      contrast: '125%',
      brightness: '125%',
      saturate: '120%',
    },
  ],
  [
    'Slumber',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '35%',
      contrast: '125%',
      saturate: '125%',
      background: 'rgba(125, 105, 24, 0.2)',
      'mix-blend-mode': 'darken',
    },
  ],
  [
    'Stinson',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '25%',
      saturate: '85%',
      background: 'linear-gradient(to bottom, #222222 0%, #ffffff 100%)',
    },
  ],
  [
    'Sutro',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '40%',
      contrast: '120%',
      brightness: '90%',
      saturate: '140%',
      'hue-rotate': '-10deg',
      background:
        'radial-gradient(circle closest-corner, transparent 50%, rgba(0,0,0,.5) 90%)',
      'mix-blend-mode': 'darken',
    },
  ],
  [
    'Toaster',
    {
      ...DEFAULT_FILTER_OPTIONS,
      contrast: '150%',
      brightness: '90%',
      background: 'linear-gradient(to bottom, #ff9966 0%, #ff5e62 100%)',
    },
  ],
  [
    'Valencia',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '12%',
      brightness: '108%',
      contrast: '125%',
      background:
        'linear-gradient(to bottom, rgba(51, 0, 102, 0.4) 0%, rgba(0, 0, 0, 0) 100%)',
    },
  ],
  [
    'Vesper',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '35%',
      contrast: '115%',
      brightness: '120%',
      saturate: '130%',
      background: 'rgba(125,105,24,0.25)',
      'mix-blend-mode': 'overlay',
    },
  ],
  [
    'Walden',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '50%',
      brightness: '90%',
      background: 'rgba(0, 68, 204, 0.3)',
      'mix-blend-mode': 'overlay',
    },
  ],
  [
    'Willow',
    {
      ...DEFAULT_FILTER_OPTIONS,
      brightness: '85%',
      saturate: '0%',
      background:
        'linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,.1) 60%, rgba(0,0,0,.25) 100%)',
    },
  ],
  [
    'X-Pro II',
    {
      ...DEFAULT_FILTER_OPTIONS,
      sepia: '15%',
      contrast: '110%',
      brightness: '125%',
      background: 'linear-gradient(to bottom, #e14f1c 0%, #f5b041 100%)',
    },
  ],
]);
