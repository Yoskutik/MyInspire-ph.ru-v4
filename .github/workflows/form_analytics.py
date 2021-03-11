from oauth2client.service_account import ServiceAccountCredentials
from googleapiclient.discovery import build
from datetime import datetime
import codecs
import sys

credentials = ServiceAccountCredentials.from_json_keyfile_name('file.json', ['https://www.googleapis.com/auth/analytics.readonly'])
response = build('analyticsreporting', 'v4', credentials=credentials).reports().batchGet(
    body={
        'reportRequests': [{
            'viewId': sys.argv[1],
            'dateRanges': [{'startDate': '2020-12-25', 'endDate': '2021-01-01'}],
            'metrics': [
                {'expression': 'ga:sessions'},
                {'expression': 'ga:avgSessionDuration'},
            ],
            'dimensions': [
                {'name': 'ga:operatingSystem'},
            ],
        }]
    }
).execute()

totals = response.get('reports')[0].get('data').get('totals')[0].get('values')
rows = response.get('reports')[0].get('data').get('rows')


def filter_by_os(os):
    tmp = list(filter(lambda x: x['dimensions'][0] == os, rows))[0].get('metrics')[0].get('values')
    tmp[0] = int(tmp[0])
    tmp[1] = float(tmp[1])
    return tmp


android = filter_by_os('Android')
ios = filter_by_os('iOS')
windows = filter_by_os('Windows')

with codecs.open('message.txt', 'w', 'utf-8') as f:
    f.write(f'''<b>{datetime.now().strftime('%H:%M %d.%m.%Y')}</b>
<i>Еженедельная сводка по сайту</i>
➡️ Сайт посетило пользователей: {totals[0]}
➡️ Средняя продолжительность посещения составила: {float(totals[1]):.2f} сек.

Сводная таблица:
<pre>
OS     |Users|Duration
-------|-----|--------
IOS    |{ios[0]:>4} |{ios[1]:>7.2f} c.
Android|{android[0]:>4} |{android[1]:>7.2f} c.
Windows|{windows[0]:>4} |{windows[1]:>7.2f} c.
</pre>
''')
