import PersonalArea from '../PersonalArea/PersonalArea';
import css from './Header.module.css'

const Header = () => {
  return (
    <header className={css.header}>
      <h1 className={css.header_title}>Awesome Kanban Board</h1>
      <PersonalArea />
    </header>
  );
}

export default Header;