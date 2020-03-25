import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ProfilePicture, { Image, ProfilePictureProps as IProfilePictureProps } from './profile-picture';
import IconButton from './icon-button';

import { flexCenter } from '../../style/mixins';

const reqSvgs = require.context('../../style/images/profiles', true, /\.svg$/);

const pictures = reqSvgs.keys().map(path => reqSvgs(path));

type EditableProfilePictureProps = IProfilePictureProps & {
    onPictureChange: (pictureID: number) => void;
}

const EditableProfilePicture: React.FC<EditableProfilePictureProps> = ({ pic, size, onPictureChange }: EditableProfilePictureProps) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [container, setContainer] = useState<HTMLSpanElement | null>(null);
    const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        if (container && imgRef) {
            container.scrollTo({ left: imgRef.offsetLeft - 64 - 25 });
        }
    }, [editMode, container]);

    const onImgSelected = (picture: number) => {
        onPictureChange(picture);
        setEditMode(!editMode);
    };

    return (
        <Container>

            {editMode ?
                <ImagesContainer
                    ref={setContainer}
                >
                    {pictures.map((picture, key) =>
                        <Image
                            key={key}
                            src={picture.default}
                            className={`${size} ${pic == key && 'selected'}`}
                            onClick={() => onImgSelected(key)}
                            ref={r => key == pic && setImgRef(r)}
                        />
                    )}
                </ImagesContainer>
                :
                <ProfilePicture
                    size={size}
                    pic={pic}
                />
            }

            <IconButton
                icon={editMode ? 'close' : 'edit'}
                onClick={() => setEditMode(!editMode)}
                color='primary'
            />
        </Container >
    );
};

const Container = styled.div`
    ${flexCenter}
    position: relative;
    width: 280px;

    padding: 0px 15px;
`;

const ImagesContainer = styled.span`
    display: inline-block;
    white-space: nowrap;
    overflow-x: scroll;
    width: 280px;
    padding: 20px;
`;

export default EditableProfilePicture;