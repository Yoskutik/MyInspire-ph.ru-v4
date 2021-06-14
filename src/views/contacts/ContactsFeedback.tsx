import React, {
    FC, MouseEvent, useContext, useRef, useState,
} from 'react';
import { $, $$, FetchRequest } from '@utils';
import { ToastContext } from '@components';
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

    const onBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
        evt.target.value = evt.target.value.trim();
        setDanger(!evt.target.checkValidity());
    };

    return (
        <div className={styles.contacts__feedback_field}>
            <label className={styles.contacts__feedback_label} htmlFor={props.name}>
                {React.createElement(props.rows ? 'textarea' : 'input', {
                    ...props,
                    className: `${styles.contacts__feedback_input} ${danger ? styles.danger : ''}`,
                    pattern: props.type === 'email' ? '\\S+@\\S+\\.\\S+' : null,
                    id: props.name,
                    onBlur,
                    ref,
                })}
            </label>
        </div>
    );
};

const InputTel: FC = () => {
    const [danger, setDanger] = useState(false);
    const ref = useRef<HTMLInputElement>();

    const onFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
        if (evt.target.value.length < 3) {
            evt.target.value = '+7 ';
        }
    };

    const onBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
        if (evt.target.value === '+7 ') {
            evt.target.value = '';
        }
        setDanger(!ref.current.validity.valid);
    };

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.value.length < 3) {
            evt.target.value = '+7 ';
        } else {
            try {
                const [, a, b, c, d] = evt.target.value.match(/\+7 (\d{0,3}) ?(\d{0,3}) ?(\d{0,2}) ?(\d{0,2})/);
                evt.target.value = `+7 ${`${a} ${b} ${c} ${d}`.trim()}`;
            } catch { /* */ }
        }
    };

    return (
        <div className={styles.contacts__feedback_field}>
            <label className={styles.contacts__feedback_label} htmlFor="tel">
                <input className={`${styles.contacts__feedback_input} ${danger ? styles.danger : ''}`} type="tel"
                       name="tel" id="tel" pattern="\+7 \d{3} \d{3} \d{2} \d{2}" placeholder="Телефон:" ref={ref}
                       onChange={onChange} onFocus={onFocus} onBlur={onBlur}/>
            </label>
        </div>
    );
};

let lastSendAt: number;

export const ContactsFeedback: FC = () => {
    const [showRequiredError, setShowRequiredError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showTelError, setShowTelError] = useState(false);
    const [showTelOrEmailError, setShowTelOrEmailError] = useState(false);
    const { makeToast } = useContext(ToastContext);
    const formRef = useRef<HTMLFormElement>();

    const onSubmit = (evt: MouseEvent) => {
        evt.preventDefault();

        const requiredError = $$(`.${styles.contacts__feedback_input}[required]`)
            .some((el: HTMLInputElement) => el.validity.valueMissing);
        setShowRequiredError(requiredError);

        const email = $<HTMLInputElement>(`.${styles.contacts__feedback_input}[name=email]`);
        const emailError = email.validity.typeMismatch;
        setShowEmailError(emailError);

        const tel = $<HTMLInputElement>(`.${styles.contacts__feedback_input}[name=tel]`);
        const telError = tel.validity.typeMismatch;
        setShowTelError(telError);

        const telOrEmailError = !tel.value && !email.value;
        setShowTelOrEmailError(telOrEmailError);

        if (requiredError || emailError || telError || telOrEmailError) return;
        if (lastSendAt && Date.now() - lastSendAt < 15000) return;

        new FetchRequest({
            url: '/sendMail/',
            params: new FormData(formRef.current),
        }).request()
            .then(() => {
                lastSendAt = Date.now();
                formRef.current.reset();
                makeToast({ body: 'Сообщение успешно отправлено' });
            })
            .catch(() => makeToast({ body: 'При отправке сообщения возникли ошибки', type: 'error' }));
    };

    return (
        <div className={styles.contacts__feedback}>
            <h3 className={styles.contacts__feedback_title}>Прямая связь</h3>
            <form className={styles.contacts__feedback_form} autoComplete="off" ref={formRef}>
                <Input type="text" name="name" placeholder="Ваше имя:" required />
                <InputTel/>
                <Input type="email" name="email" placeholder="E-mail:"/>
                <Input name="message" placeholder="Сообщение:" required rows={6} />
                <input type="submit" value="Отправить" className={styles.contacts__feedback_submit} onClick={onSubmit}/>
            </form>
            {showRequiredError && (
                <p className={styles.contacts__feedback_error}>* Заполните, пожалуйста, все необходимые поля</p>
            )}
            {showTelError && (
                <p className={styles.contacts__feedback_error}>* Поле телефона заполнено неверно</p>
            )}
            {showEmailError && (
                <p className={styles.contacts__feedback_error}>* Поле почты заполнено неверно</p>
            )}
            {showTelOrEmailError && (
                <p className={styles.contacts__feedback_error}>
                    * Пожалуйста, укажите номер телефона и/или почтовый адрес
                </p>
            )}
        </div>
    );
};
