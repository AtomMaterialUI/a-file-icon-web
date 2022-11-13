import { css } from '@emotion/react';

export const GlobalStyles = css`
  :host,
  :host :root,
  :root {
    --bg: #263238;
    --fg: #b0bec5;
    --text: #607D8B;
    --selectBg: #546E7A;
    --selectFg: #FFFFFF;
    --selFg: #FFFFFF;
    --button: #2E3C43;
    --secondBg: #32424A;
    --lbg: #32424A;
    --second: #32424A;
    --disabled: #415967;
    --contrast: #1E272C;
    --dbg: #1E272C;
    --active: #314549;
    --border: #2A373E;
    --hl: #425B67;
    --tree: #546E7A70;
    --notif: #1E272C;
    --excluded: #2E3C43;
    --excl: #2E3C43;
    --yellow: #ffcb6b;
    --attribute: #ffcb6b;
    --green: #c3e88d;
    --string: #c3e88d;
    --cyan: #89ddff;
    --operator: #89ddff;
    --blue: #82aaff;
    --function: #82aaff;
    --purple: #c792ea;
    --keyword: #c792ea;
    --class: #ffcb6b;
    --red: #f07178;
    --tag: #f07178;
    --red2: #ff5370;
    --error: #ff5370;
    --orange: #f78c6c;
    --number: #f78c6c;
    --orange2: #f78c6c;
    --parameter: #f78c6c;
    --gray: #546e7a;
    --comment: #546e7a;
    --silver: #eeffff;
    --variable: #eeffff;
    --black: #B0BEC5;
    --primary: #78DCE8;
    --primaryT: #78DCE890;
    --accent: #009688;
    --link: #80cbc4;
    --accentT: #00968890;
    --accent2: #80cbc4;
    --accent2T: #80cbc490;
    --links: #80cbc4;
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
    background: var(--bg, #263238);
    overflow: hidden;
    transition: all .5s;
    margin: 0;
    height: 100%;
    width: 100%;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: var(--fg);
    min-width: 750px;
    min-height: 600px;
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
    color: var(--links, #80cbc4);
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
    background: var(--bg);
    border-radius: 10px;
  }

  /* Handle */

  *::-webkit-scrollbar-thumb {
    background: var(--accent, #009688);
    border-radius: 10px;
  }

  /* Handle on hover */

  *::-webkit-scrollbar-thumb:hover {
    background: var(--accent, #009688);
  }

  input {
    background-color: var(--contrast, #1e272c);
    color: var(--text);
    transition: all .5s;
  }

  .comment {
    color: var(--comment);
    transition: color .5s;
  }

  .keyword {
    color: var(--keyword);
    transition: color .5s;
  }

  .function {
    color: var(--function);
    transition: color .5s;
  }

  .punctuation {
    color: var(--operator);
    transition: color .5s;
  }

  .string,
  .attr-value {
    color: var(--string);
    transition: color .5s;
  }

  .parameter {
    color: var(--parameter);
    transition: color .5s;
  }

  .number {
    color: var(--number);
    transition: color .5s;
  }

  .attr-name {
    color: var(--attribute);
    transition: color .5s;
  }

  .tag {
    color: var(--tag);
    transition: color .5s;
  }
`;