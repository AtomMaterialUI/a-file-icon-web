import { css } from '@emotion/react';

export const GlobalStyles = css`
  :host,
  :host :root,
  :root {
    --atom-bg: #263238;
    --atom-fg: #b0bec5;
    --atom-text: #607D8B;
    --atom-selectBg: #546E7A;
    --atom-selectFg: #FFFFFF;
    --atom-selFg: #FFFFFF;
    --atom-button: #2E3C43;
    --atom-secondBg: #32424A;
    --atom-lbg: #32424A;
    --atom-second: #32424A;
    --atom-disabled: #415967;
    --atom-contrast: #1E272C;
    --atom-dbg: #1E272C;
    --atom-active: #314549;
    --atom-border: #2A373E;
    --atom-hl: #425B67;
    --atom-tree: #546E7A70;
    --atom-notif: #1E272C;
    --atom-excluded: #2E3C43;
    --atom-excl: #2E3C43;
    --atom-yellow: #ffcb6b;
    --atom-attribute: #ffcb6b;
    --atom-green: #c3e88d;
    --atom-string: #c3e88d;
    --atom-cyan: #89ddff;
    --atom-operator: #89ddff;
    --atom-blue: #82aaff;
    --atom-function: #82aaff;
    --atom-purple: #c792ea;
    --atom-keyword: #c792ea;
    --atom-class: #ffcb6b;
    --atom-red: #f07178;
    --atom-tag: #f07178;
    --atom-red2: #ff5370;
    --atom-error: #ff5370;
    --atom-orange: #f78c6c;
    --atom-number: #f78c6c;
    --atom-orange2: #f78c6c;
    --atom-parameter: #f78c6c;
    --atom-gray: #546e7a;
    --atom-comment: #546e7a;
    --atom-silver: #eeffff;
    --atom-variable: #eeffff;
    --atom-black: #B0BEC5;
    --atom-primary: #78DCE8;
    --atom-primaryT: #78DCE890;
    --atom-accent: #009688;
    --atom-link: #80cbc4;
    --atom-accentT: #00968890;
    --atom-accent2: #80cbc4;
    --atom-accent2T: #80cbc490;
    --atom-links: #80cbc4;
  }

  *,
  *::before,
  *::after {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html,
  body {
    background: var(--atom-bg, #263238);
    overflow-y: auto;
    overflow-x: hidden;
    transition: all .5s;
    margin: 0;
    height: 100%;
    width: 100%;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: var(--atom-fg);
    min-width: 450px;
    min-height: 300px;
    max-height: 800px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 0.5em 0;
    font-weight: 400;
    line-height: 1.2;
  }

  h1 {
    font-size: 2em;
  }

  a {
    color: var(--atom-links, #80cbc4);
  }

  code {
    font-family: var(--font-family, "Operator Mono", menlo, inconsolata, monospace);
    font-size: var(--font-size, calc(1em - 2px));
  }

  @media (min-width: 400px) {
    body {
      font-size: 16px;
    }
  }

  *::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */

  *::-webkit-scrollbar-track {
    background: var(--atom-bg);
    border-radius: 10px;
  }

  /* Handle */

  *::-webkit-scrollbar-thumb {
    background: var(--atom-accent, #009688);
    border-radius: 10px;
  }

  /* Handle on hover */

  *::-webkit-scrollbar-thumb:hover {
    background: var(--atom-accent, #009688);
  }

  input {
    background-color: var(--atom-contrast, #1e272c);
    color: var(--atom-text);
    transition: all .5s;
  }

  .comment {
    color: var(--atom-comment);
    transition: color .5s;
  }

  .keyword {
    color: var(--atom-keyword);
    transition: color .5s;
  }

  .function {
    color: var(--atom-function);
    transition: color .5s;
  }

  .punctuation {
    color: var(--atom-operator);
    transition: color .5s;
  }

  .string,
  .attr-value {
    color: var(--atom-string);
    transition: color .5s;
  }

  .parameter {
    color: var(--atom-parameter);
    transition: color .5s;
  }

  .number {
    color: var(--atom-number);
    transition: color .5s;
  }

  .attr-name {
    color: var(--atom-attribute);
    transition: color .5s;
  }

  .tag {
    color: var(--atom-tag);
    transition: color .5s;
  }
`;
