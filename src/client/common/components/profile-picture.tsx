import styled from 'styled-components';
import React from 'react';

import { boxShadowLight } from '../../style/mixins';

const reqSvgs = require.context('../../style/images/profiles', true, /\.svg$/);

const pictures = reqSvgs.keys().map(path => reqSvgs(path));

export type ProfilePictureProps = React.Props<React.HTMLAttributes<HTMLStyleElement>> & {
    pic: number;
    size?: 'small' | 'large';
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ pic, size }: ProfilePictureProps) => {

    return (
        <Image
            className={size}
            src={pictures[pic].default}
        />
    );
};

export const Image = styled.img`
    ${boxShadowLight}

    margin: 5px;

    width: 64px;
    height: 64px;

    &.small {
        width: 36px;
        height: 36px;
    }

    &.large {
        width: 128px;
        height: 128px;
    }

    &.selected {
        border: 5px solid purple;
    }

    border-radius: 50%;
`;

export default ProfilePicture;