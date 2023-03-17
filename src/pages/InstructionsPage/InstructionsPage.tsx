import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import styling from './InstructionsPage.module.css';

export const InstructionsPage = () => {
  return (
    <>
      <Link to="/Carcassonne-Challenge/">
        <div className={styling.backButton}>
          <FaArrowLeft />
        </div>
      </Link>
      <div className={styling.instructionsContainer}>
        <div className={styling.dealingModeContainer}>
          <div className={styling.dealingModeOptions}>
            <Link
              to="/Carcassonne-Challenge/howtoplay/classic"
              className={styling.linkOption}
            >
              <div
                id="classic-mode"
                className={
                  styling.dealingModeOption +
                  ' ' +
                  styling.backgroundOption +
                  ' ' +
                  styling.interactable
                }
              >
                <div className={styling.dealingModeImageContainer}>
                  <div
                    className={styling.dealingModeImage + ' ' + styling.classicModeImage}
                  ></div>
                </div>
                <div className={styling.dealingModeInfo}>
                  <div className={styling.dealingModeTitle}>
                    Classic <br /> Challenge
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/Carcassonne-Challenge/howtoplay/road"
              className={styling.linkOption}
            >
              <div
                id="road-mode"
                className={
                  styling.dealingModeOption +
                  ' ' +
                  styling.backgroundOption +
                  ' ' +
                  styling.interactable
                }
              >
                <div className={styling.dealingModeImageContainer}>
                  <div
                    className={styling.dealingModeImage + ' ' + styling.roadModeImage}
                  ></div>
                </div>
                <div className={styling.dealingModeInfo}>
                  <div className={styling.dealingModeTitle}>
                    Road <br />
                    Rally
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/Carcassonne-Challenge/howtoplay/city"
              className={styling.linkOption}
            >
              <div
                id="city-mode"
                className={
                  styling.dealingModeOption +
                  ' ' +
                  styling.backgroundOption +
                  ' ' +
                  styling.interactable
                }
              >
                <div className={styling.dealingModeImageContainer}>
                  <div
                    className={styling.dealingModeImage + ' ' + styling.cityModeImage}
                  ></div>
                </div>
                <div className={styling.dealingModeInfo}>
                  <div className={styling.dealingModeTitle}>
                    City <br />
                    Craze
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/Carcassonne-Challenge/howtoplay/abbey"
              className={styling.linkOption}
            >
              <div
                id="abbey-mode"
                className={
                  styling.dealingModeOption +
                  ' ' +
                  styling.backgroundOption +
                  ' ' +
                  styling.interactable
                }
              >
                <div className={styling.dealingModeImageContainer}>
                  <div
                    className={styling.dealingModeImage + ' ' + styling.abbeyModeImage}
                  ></div>
                </div>
                <div className={styling.dealingModeInfo}>
                  <div className={styling.dealingModeTitle}>
                    Abbeys <br />
                    Ablaze
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
