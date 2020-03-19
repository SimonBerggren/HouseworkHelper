import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import IconButtonTop from './icon-button-top';
import { flexCenter } from '../../style/mixins';
import ProfilePicture, { Image, ProfilePictureProps as IProfilePictureProps } from './profile-picture';

const reqSvgs = require.context('../../style/images/profiles', true, /\.svg$/);

const pictures = reqSvgs.keys().map(path => reqSvgs(path));

type EditableProfilePictureProps = IProfilePictureProps & {
    onPictureChange?: (pictureID: number) => void;
}

const EditableProfilePicture: React.FC<EditableProfilePictureProps> = ({ pic, size, onPictureChange }: EditableProfilePictureProps) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [container, setContainer] = useState<HTMLSpanElement | null>(null);
    const [imgScroll, setImgScroll] = useState<HTMLImageElement | null>(null);
    const [selectedImg, setSelectedImg] = useState<number>(pic);

    useEffect(() => {
        if (container && imgScroll) {
            container.scrollTo({ left: imgScroll.offsetLeft - 64 - 25 });
        }

        setSelectedImg(pic);

    }, [editMode, container]);

    const onIconClick = () => {
        if (editMode) {
            onPictureChange && onPictureChange(selectedImg);
        }
        setEditMode(!editMode);
    };

    return (
        <Container>
            <IconButtonTop left
                icon={editMode ? 'check' : 'edit'}
                color='primary'
                onClick={onIconClick}
            />
            {editMode ?
                <ImagesContainer
                    ref={setContainer}
                >
                    {pictures.map((picture, key) =>
                        <Image
                            key={key}
                            src={picture.default}
                            className={`${size} ${selectedImg == key && 'selected'}`}
                            onClick={() => setSelectedImg(key)}
                            ref={r => key == pic && setImgScroll(r)}
                        />
                    )}
                </ImagesContainer>
                :
                <ProfilePicture
                    size={size}
                    pic={pic}
                />
            }
        </Container >
    );
};

const Container = styled.div`
    ${flexCenter}
    position: relative;
    width: 276px;

    padding: 15px;
    padding-bottom: 0;
`;

const ImagesContainer = styled.span`
    display: inline-block;
    white-space: nowrap;
    overflow-x: scroll;
    width: 276px;
    padding: 20px;
`;

export default EditableProfilePicture;