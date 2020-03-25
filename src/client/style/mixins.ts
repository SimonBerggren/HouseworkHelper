// https://github.com/microsoft/TypeScript/issues/28010
// ts can't handle array spreading if atleat one argument is expected
// @ts-nocheck

import breakpoints from './breakpoints';

import { css } from 'styled-components';

export const respondTo = Object.keys(breakpoints).reduce((accumulator, label) => {
    accumulator[label] = (...args: any[]) => css`
		@media (min-width: ${breakpoints[label]}) {
			${css(...args)};
		}
	`;
    return accumulator;
}, {} as any);

export const flexCenter = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const boxShadow = css`
    box-shadow: 0px 0px 10px 0px black;
`;

export const boxShadowLight = css`
    box-shadow: 0px 0px 6px 0px black;
`;

export const boxShadowNone = css`
    box-shadow: 0px 0px 0px 0px black;
`;

export const boxShadowInset = css`
    box-shadow: inset 0px 0px 6px 0px black;
`;

export const fadeIn = (duration: number) => css`
    animation: fadein ${duration}s linear;
`;

export const growWidthIn = (duration: number, targetWidth: number) => css`
    @keyframes growwidthin {
        from { width: 0%; }
        to   { width: '${targetWidth}%'; }
    }

    animation: growwidthin ${duration}s ease-in-out;
`;