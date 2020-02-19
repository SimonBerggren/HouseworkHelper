// https://github.com/microsoft/TypeScript/issues/28010
// ts can't handle array spreading if atleat one argument is expected
// @ts-nocheck

import { css } from 'styled-components';
import breakpoints from './breakpoints';

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
`;