# MyInspire-ph.ru

![](https://img.shields.io/badge/TypeScript-444?logo=typescript&logoColor=f0f0f0)
![](https://img.shields.io/badge/JavaScript-444?logo=javascript&logoColor=f0f0f0)
![](https://img.shields.io/badge/React-444?logo=react&logoColor=f0f0f0)
![](https://img.shields.io/badge/Webpack-444?logo=webpack&logoColor=f0f0f0)
![](https://img.shields.io/badge/Github%20Actions-444?logo=github&logoColor=f0f0f0)
![](https://img.shields.io/badge/SCSS-444?logo=sass&logoColor=f0f0f0)
![](https://img.shields.io/badge/ESLint-444?logo=eslint&logoColor=f0f0f0)
![](https://img.shields.io/badge/Stylelint-444?logo=stylelint&logoColor=f0f0f0)
![](https://img.shields.io/badge/PHP-444?logo=php&logoColor=f0f0f0)

![](https://img.shields.io/lgtm/grade/javascript/github/Yoskutik/MyInspire-ph.ru-RTS?label=Code%20quality)
![](https://img.shields.io/lgtm/alerts/github/Yoskutik/MyInspire-ph.ru-RTS?label=Vulnerabilities)
![](https://github.com/yoskutik/MyInspire-ph.ru-RTS/workflows/Testing/badge.svg)


Наверное, я уже слишком далеко зашел в создании этого [сайта](https://myinspire-ph.ru) и навряд 
ли я когда-либо ещё буду выкладывать настолько замороченные проекты. Надеюсь, кому-то этот 
проект может показаться интересным или даже полезным (в таком случае поставьте плез звездочку).

<details open>
  <summary><b>Процесс разработки</b></summary>
  <br/>
  <p>
    Вся разработка ведётся исключительно на <i>TypeScript</i>. На чистом <i>JavaScript</i>
    написана только конфигурация <i>WebPack</i>. Любой возможный код на <i>HTML</i> 
    минимизирован и включает в себя только статические мета-данные и подключение основного
    скрипта и Google аналитики. 
  </p>
  <p>
    Все компоненты написаны на <i>React</i>, причём на каждый компонент отводится отдельная
    папка, включающая в себя более мелкие внутренние компоненты и стили. Стили не вынесены в
    отдельную папку, каждый стиль находится максимально близко с своей компоненте. Стили
    написаны на языке <i>SCSS</i>. Наименование всех элементов осуществляется по технологии
    <a href="https://ru.bem.info/">БЭМ</a>. Таким образом все сгенерированные <i>HTML</i>
    элементы получают свои стили по селектору, состоящему из 1го (в исключительных случаях 2х)
    классов и по-необходимости эти стили легко переназначить. Каждая компонента - 
    функциональная единица. Также по необходимости к каждой компоненте добавляется 
    микроразметка для повышения индексирования. 
  </p>
  <p>
    В проекте создана отдельная директория для хранения данных: описание всех имеющихся 
    страниц, цен и услуг и т.п. Подобный вынос данных в отдельные <code>.json</code> файлы
    необходим для компонентного подхода. 
  </p>
  <p>
    В проекте есть проверка кода на соответствие стилям <code>.ts</code> и <code>.scss</code>
    файлов. Проверка <code>.ts</code> файлов осуществляется с помощью <i>ESLint</i> и качестве
    основных правил был взят набор от <i>AirBnb</i>. Проверка <code>.scss</code> осуществляется
    с помощью <i>Stylelint</i> и рекомендованного им же набора правил. 
  </p>
  <p>
    При каждой сборке происходит автоматическая конвертация <code>.jpg</code> файлов в 
    <code>.webp</code>, генерация <code>sitemap.xml</code> с обновленными датами, генерация
    <code>favicon</code> для различных Android и iOS устройств и минификация при сборке в 
    версии production. При коммите происходит проверка на соответствие стилям и обновление 
    версии в <code>package.json</code>. Для этого используются пакеты <i>Husky</i> и
    <i>Lint-staged</i>.
  </p>
  <p>
    В проекте <b>ЕСТЬ</b> CI/CD. И достигнуто оно с помощью <i>GitHub Actions</i>. При пуше или
    при мерже веток в мастер происходит автоматическая проверка на соответствие стилям, сборка,
    деплой на FTP сервер и автоматическая нотификация в Telegram о статусе (успешно, ошибка) 
    обновления. Также раз в неделю в Telegram приходят сообщения c собранной за неделю
    статистикой.
  </p>
  <p>
    В теории, при следующем <small>(если оно будет)</small> большом обновлении я-разработчик
    создаю новую ветку. Затем, по готовности, я сохраняю все изменения, и на каждом коммите
    происходит проверка на соответствие стилям. Затем при слиянии с мастером происходит
    автоматическая проверка уже на серверах GitHub, и при её успешном завершении происходит
    сборка, деплой на FTP сервер сайта и в самом конце в Telegram приходит уведомление о
    статусе сборки и деплоя.
  </p>
</details>

<details>
  <summary><b>Использованные технологии</b></summary>
  <br>
  <ul>
    <li><i>TypeScript</i></li>
    <li><i>React.js</i></li>
    <li><i>Webpack</i></li>
    <li><i>Eslint</i></li>
    <li><i>Stylelint</i></li>
    <li><i>SCSS</i></li>
    <li><i>Schema.org</i> - микроразметка (для улучшения индексирования)</li>
    <li><i>LD-JSON</i> - микроразметка (для улучшения индексирования)</li>
    <li><i>Open Graph</i> - отображение ссылки в соц. сетях (для улучшения индексирования)</li>
    <li><i>GitHub Actions</i> для CI/CD и нотификации</li>
    <li><i>PHP</i></li>
  </ul>
</details>

<details>
  <summary><b>CEO оптимизация</b></summary>
  <br>
  <ul>
    <li>
      Для повышения скорости загрузки было применено:
      <ul>
        <li>
          Минификация файлов. А именно <code>UglifyJS</code>, <code>Terser</code> и 
          <code>CssMinimizer</code>.
        </li>
        <li>Формат <code>.webp</code> для фотографий.</li>
        <li>
          С помощью <code>react-router-dom</code> я сделал по факту один <code>bundle.js</code>, 
          включающий в себя заголовок, подвал и общие стили. А содержимое страниц я распихал по 
          чанкам. Так, при переходе из одной страницы в другую, пользователь тратит буквально 
          пару килобайт для загрузки (не считая фотографий).
        </li>
        <li>
          Фактический размер изображения не превышает размера экрана. То есть никаких 6000х4000px
          пикселей, хоть такие фотографии и более качественны.
        </li>
        <li>Ленивая загрузка везде, где можно. В том числе и для React компонент.</li>
        <li>Попытался не слишком нагружать код дополнительными фреймворками и прочим.</li>
        <li>
          А ещё <code>font-display: fallback</code> для загрузки шрифтов должен (в теории) 
          помочь.
        </li>
        </ul>
      <li><s>Сформировал семантическое ядро</s> Постарался сформировать</li>
      <li>Установил быстрые ссылки для Yandex.</li>
      <li>Использовал адаптивную вёрстку.</li>
      <li>Переключил HTTP на HTTPS.</li>
      <li>Переключил HTTP/1.1 ни HTTP/2.</li>
      <li>
        Добавил <code>.htaccess</code>
        <ul>
          <li>
            Избавился от дубликатов страниц (например, <code>myinspire-ph.ru////</code> или
            <code>myinspire-ph.ru/index.html</code>).
          </li>
          <li>Добавил срок действия для файлов для кэширования.</li>
        </ul>
      </li>
      <li>Добавил <code>robots.txt</code>.</li>
      <li>
        Добавил <code>sitemap.xml</code> с автоматическим обновлением даты при обновлении
        сайта.
      </li>
      <li>Добавил <code>favicon</code> разных размеров для Android и IPhone.</li>
      <li>Добавил ссылки на социальные сети.</li>
      <li>Добавил Open Graph для красивого отображения в социальных сетях.</li>
  </ul>
  <hr/>
  P.S. Я не СЕО'шник, так что не сетуйте, если я что-то не то сделал.
</details>

---

Контакты:

<a href="https://github.com/Yoskutik">
  <img src="https://img.shields.io/badge/Github-444?logo=github&logoColor=f0f0f0"/>
</a>

<a href="https://stackoverflow.com/users/11589183/yoskutik">
  <img src="https://img.shields.io/badge/StackOverflow-444?logo=stackoverflow&logoColor=f0f0f0"/>
</a>

<a href="https://t.me/yoskutik">
  <img src="https://img.shields.io/badge/Telegram-444?logo=telegram&logoColor=f0f0f0"/>
</a>

<a href="https://vk.com/yoskutik">
  <img src="https://img.shields.io/badge/VK-444?logo=vk&logoColor=f0f0f0"/>
</a>
