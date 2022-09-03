import { useForm } from "react-hook-form";
import {
  EMAIL_REGEX_VALIDATION,
  PASSWORD_REGEX_VALIDATION,
  PHONE_REGEX_VALIDATION,
} from "../lib/lib";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    registerAccount(data);
  };

  async function registerAccount(data) {
    const postData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formdata: data,
        sitename: namewanted,
      }),
    };
    const apiUrl = `${process.env.NEXT_PUBLIC_URL}/api/register/register-account`;
    const res = await fetch(apiUrl, postData);
    const registerAccountResponse = await res.json();
    console.log(registerAccountResponse);
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to React Hook Form</h1>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.flex2}`}>
            <div className={styles.input}>
              <label htmlFor="" className={styles.label}>
                First Name*
              </label>
              <input
                type="text"
                className={styles.field}
                {...register("fname", { required: true, minLength: 3 })}
              />
              {errors.fname && (
                <span className="errormsg">
                  Should be at least 3 characters
                </span>
              )}
            </div>
            <div className={styles.input}>
              <label htmlFor="" className={styles.label}>
                Last Name*
              </label>
              <input
                type="text"
                className={styles.field}
                {...register("lname", { required: true, minLength: 3 })}
              />
              {errors.lname && (
                <span className="errormsg">
                  Should be at least 3 characters
                </span>
              )}
            </div>
          </div>
          <div className={`${styles.flex1}`}>
            <div className={styles.input}>
              <label htmlFor="" className={styles.label}>
                Email*
              </label>
              <input
                type="email"
                className={styles.field}
                {...register("email", {
                  required: true,
                  pattern: EMAIL_REGEX_VALIDATION,
                })}
              />
              {errors.email && (
                <span className="errormsg">Should be an email address</span>
              )}
            </div>
            <div className={styles.input}>
              <label htmlFor="" className={styles.label}>
                Password*
              </label>
              <input
                type="text"
                className={styles.field}
                {...register("password", {
                  required: true,
                  pattern: PASSWORD_REGEX_VALIDATION,
                })}
              />
              {errors.password && (
                <span className="errormsg">
                  Should be 8 characters, at least one letter, one number, one
                  special symbol
                </span>
              )}
            </div>
          </div>
          <input type="submit" className={styles.btn} value="Register" />
        </form>
      </main>
    </div>
  );
}
