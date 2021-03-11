import React, { FC, MouseEvent, useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { $, $$, FetchRequest } from '@utils';
import styles from '@sass/pages/contacts/Contacts.module.scss';

interface InputProps {
    type?: 'text' | 'email';
    placeholder?: string;
    required?: boolean;
    name?: string;
    rows?: number;
}

const Input: FC<InputProps> = props => {
    const [danger, setDanger] = useState(false);
    const ref = useRef<HTMLInputElement>();

    return (
        <div className={styles.contacts__feedback_field}>
            <label className={styles.contacts__feedback_label} htmlFor={props.name}>
                {React.createElement(props.rows ? 'textarea' : 'input', {
                    ...props,
                    className: `${styles.contacts__feedback_input} ${danger ? 'danger' : ''}`,
                    onBlur: () => setDanger(!ref.current.validity.valid),
                    id: props.name,
                    ref,
                })}
            </label>
        </div>
    );
};

let lastSendAt: number;

export const ContactsFeedback: FC = () => {
    const [showRequiredError, setShowRequiredError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const { addToast } = useToasts();

    const onSubmit = (evt: MouseEvent) => {
        evt.preventDefault();
        // const requiredError = $$(`.${styles.contacts__feedback_input}[required]`)
        //     .some((el: HTMLInputElement) => el.validity.valueMissing);
        // setShowRequiredError(requiredError);
        // const emailError = $<HTMLInputElement>('.contacts__feedback_input[name=email]').validity.typeMismatch;
        // setShowEmailError(emailError);
        //
        // if (!requiredError && !emailError) return;
        //
        // if (lastSendAt && Date.now() - lastSendAt < 15000) return;
        //
        // const form = $<HTMLFormElement>('.contacts__feedback_form');
        new FetchRequest({ url: '/sendMail/' }).request();
        // fetch('/api/sendMail.php', {
        //     method: 'POST',
        //     body: new FormData(form),
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             lastSendAt = Date.now();
        //             form.reset();
        //             addToast('Сообщение успешно отправлено', {
        //                 appearance: 'success',
        //                 autoDismiss: true,
        //             });
        //         } else {
        //             throw new Error();
        //         }
        //     })
        //     .catch(() => addToast('При отправке сообщения возникли ошибки', {
        //         appearance: 'error',
        //         autoDismiss: true,
        //     }));
    };

    return (
        <div className={styles.contacts__feedback}>
            <h3 className={styles.contacts__feedback_title}>Прямая связь</h3>
            <form className={styles.contacts__feedback_form} autoComplete="off">
                <Input type="text" name="name" placeholder="Ваше имя:" required />
                <Input type="email" name="email" placeholder="E-mail:" required />
                <Input type="text" name="subject" placeholder="Тема:" required />
                <Input name="message" placeholder="Сообщение:" required rows={6} />
                <input type="submit" value="Отправить" className={styles.contacts__feedback_submit} onClick={onSubmit}/>
            </form>
            {showRequiredError && (
                <p className={styles.contacts__feedback_error}>* Заполните, пожалуйста, все поля</p>
            )}
            {showEmailError && (
                <p className={styles.contacts__feedback_error}>* Поле почты заполнено неверно</p>
            )}
        </div>
    );
};
