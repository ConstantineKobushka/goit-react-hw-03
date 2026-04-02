import styles from './Contact.module.css';

const Contact = ({ id, name, number, onDelete }) => {
  return (
    <li className={styles.contactItem} key={id}>
      <div className={styles.contactInfo}>
        <p className={styles.contactText}>{name}</p>
        <p className={styles.contactText}>{number}</p>
      </div>
      <button className={styles.contactBtn} onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
