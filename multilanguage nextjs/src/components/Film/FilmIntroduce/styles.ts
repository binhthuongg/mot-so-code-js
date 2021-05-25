import { mainColor } from '../../../constants/theme';
import css from 'styled-jsx/css';

export default css`
    .filmIntroduce {
        position: relative;
        @media screen and (max-width: 767px) {
            .filmHeader {
                width: 100%;
            }
            .filmInformation {
                bottom: 0;
                /* position: static; */
                .filmTitleBig {
                    font-size: 25px;
                }
                .filmTitleSmall {
                    font-size: 15px;
                }
                .filmShortDescription {
                    font-size: 15px;
                }
            }
            .filmDetails {
                display: block;
                .filmMainInformationWrapper {
                    width: 100%;
                    padding: 0;
                    margin-bottom: 20px;
                }
                .filmMetaWrapper {
                    width: 100%;
                    padding: 0;
                }
            }
        }
    }
    .filmInformation {
        position: absolute;
        z-index: 86;
        bottom: 50px;
        left: 0;
        right: 0;
    }
    .filmHeader {
        width: 60%;
        margin-bottom: 35px;
    }

    .filmTitle {
        line-height: 1.05;
        margin-bottom: 25px;

        .filmTitleBig {
            font-size: 60px;
            @media screen and (max-width: 1799px) {
                font-size: 55px;
            }
            @media screen and (max-width: 1499px) {
                font-size: 50px;
            }
            @media screen and (max-width: 1199px) {
                font-size: 35px;
            }
        }
        .filmTitleSmall {
            margin-top: 10px;
            font-size: 40px;
            color: rgba(255, 255, 255, 0.8);
            @media screen and (max-width: 1799px) {
                font-size: 35px;
            }
            @media screen and (max-width: 1499px) {
                font-size: 30px;
            }
            @media screen and (max-width: 1199px) {
                font-size: 25px;
            }
            @media screen and (max-width: 991px) {
                font-size: 20px;
            }
        }
    }

    .filmDetails {
        display: flex;
        flex-wrap: wrap;
    }

    .filmMainInformationWrapper {
        width: 60%;
        padding-right: 5%;
    }
    .filmMetaWrapper {
        width: 40%;
    }

    .filmMeta {
        display: flex;
        font-size: 15px;
        margin-bottom: 25px;
        > div {
            background: #c4c4c4;
            color: white;
            height: 40px;
            display: flex;
            align-items: center;
            padding: 0 35px;
            &:not(:last-child) {
                margin-right: 15px;
            }
        }
        .filmAgeRate {
            width: 40px;
            text-align: center;
            border-radius: 100%;
            padding: 0 5px;
        }
        .filmTypes {
            border-radius: 40px;
            line-height: 1.1;
        }
    }
    .filmShortDescription {
        color: rgba(255, 255, 255, 0.9);
        font-size: 20px;
        @media screen and (max-width: 1199px) {
            font-size: 18px;
        }
        .readMore {
            font-size: 0.8em;
            cursor: pointer;
            &:hover {
                color: ${mainColor};
            }
        }
    }
    .filmMoreInfo {
        font-size: 15px;
        line-height: 1.5;
        display: flex;
        @media screen and (max-width: 991px) {
            display: block;
        }
        .filmYearAndLength {
            padding-right: 30px;
            @media screen and (max-width: 991px) {
                padding-right: 0;
            }
            > div {
                white-space: nowrap;
            }
        }
        .filmActorAndDirector {
            /* width: 70%; */
        }
        .label {
            display: inline;
        }
        .value {
            display: inline;
        }
        > div > div {
            margin-bottom: 15px;
            @media screen and (max-width: 991px) {
                margin-bottom: 10px;
            }
        }
    }
    .filmProgressWrapper {
        display: flex;
        align-items: center;
        margin: 35px 0;
        .filmProgress {
            position: relative;
            width: 60%;
            .line {
                width: 100%;
                height: 2px;
                background: #c4c4c4;
            }
            .progress {
                position: absolute;
                left: 0;
                height: 100%;
                top: 50%;
                transform: translateY(-50%);
                z-index: 1;
                background: #0090e1;
            }
        }
        .timeLeft {
            display: none;
            width: 40%;
            padding-left: 30px;
            color: rgba(255, 255, 255, 0.8);
        }
    }
    .filmFeaturedImage {
        width: 100%;
        outline: none;
        .inner {
            position: relative;
            /* margin-left: -27%;
            margin-bottom: -11%; */
            outline: none;
            overflow: hidden;
            max-height: 100vh;
            &:before {
                content: '';
                display: block;
                position: absolute;
                z-index: 1;
                left: 0;
                right: 0;
                top: 0;
                bottom: -5px;
                background: linear-gradient(
                    180deg,
                    #000000 17.71%,
                    rgba(0, 0, 0, 0) 100%
                );
                transform: rotate(-180deg);
            }
            img {
                object-fit: cover;
                width: 100%;
                outline: none;
                min-height: 600px;
                max-height: 100vh;
            }
        }

        .text {
            position: absolute;
            bottom: 95px;
            left: 0;
            right: 0;
            text-align: center;
            z-index: 1;
        }
    }
    .downloadAppWrapper {
        margin-top: 15px;
        text-align: center;
        h3 {
            font-size: 18px;
            margin-bottom: 15px;
            font-weight: bold;
            @media screen and (max-width: 350px) {
                font-size: 18px;
            }
        }
        .linkDownload {
            text-align: center;
            a {
                display: inline-block;
                padding: 0 30px;
                background: ${mainColor};
                height: 40px;
                line-height: 40px;
                border-radius: 5px;
                font-size: 15px;
                color: white;
            }
        }
    }
`;
