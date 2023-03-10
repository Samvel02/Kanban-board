import css from './PersonalArea.module.css'
import UserAvatar from '../../images/user-menu.png';
import { useEffect, useState } from 'react';

function useDelayUnmount(isMounted, delayTime) {
  const [showDiv, setShowDiv] = useState(false);
  useEffect(() => {
    let timeoutId;
    if (isMounted && !showDiv) {
      setShowDiv(true);
    } else if (!isMounted && showDiv) {
      timeoutId = setTimeout(() => setShowDiv(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, showDiv]);
  return showDiv;
}
const mountedStyle = { animation: "inAnimation 250ms ease-in" };
const unmountedStyle = {
  animation: "outAnimation 270ms ease-out",
  animationFillMode: "forwards"
};

export default function PersonalArea() {
  const [isMounted, setIsMounted] = useState(false);
  const showDiv = useDelayUnmount(isMounted, 250);

  return (
    <div className={css.PersonalArea_wrapper} onClick={() => setIsMounted(!isMounted)}>
      <img src={UserAvatar} alt="user avatar" className={css.user_avatar} />
      <div className={isMounted ? css.icon + ' ' + css.isopen : css.icon} />
      {showDiv &&
        <div
          className={css.PersonalArea_dropdown}
          style={isMounted ? mountedStyle : unmountedStyle}
        >
          <button className={css.PersonalArea_dropdown_button}>Profile</button>
          <button className={css.PersonalArea_dropdown_button}>Log Out</button>
        </div>

      }
    </div>
  );
}







