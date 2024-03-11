import styles from "./authfeil.module.css";

export default function AuthFeil() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Oops, vi fant ikke brukernavnet ditt!
        <span role="img">🤷‍♂️</span>
      </h1>
      <p>
        <strong>
          Kontroller at gruppens brukernavn er skrevet korrekt, og at det er
          angitt på riktig måte.
        </strong>
      </p>
      <code>{`<app-url>?username=[brukernavn]`}</code>
    </div>
  );
}
