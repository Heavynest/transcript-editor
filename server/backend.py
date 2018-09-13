import sqlite3
import flask
import os
import helper
import json
from flask_cors import CORS

app = flask.Flask(__name__)
cors = CORS(app,resources={r"/api/*":{"origin":"*"}})

@app.route('/api/user',methods=['GET'])
def user_index():
    context = {"user":"jinghan", "lover":"swl"}
    return flask.jsonify(**context)

@app.route('/api/user', methods=['POST'])
def user_information():
    item = flask.request.json
    account = item['account']
    #account:Jinghan
    password = item['password']
    #password: 0924
    print(type(account))
    conn = sqlite3.connect('../db/var/example.sqlite3')
    cur = conn.cursor()
    cur.execute('select userid,password from user where accountName=?',(account,))
    result = cur.fetchone()
    user_id = result[0]
    db_password = result[1]
    context = {"id": user_id,"status":""}
    if db_password == password:
        context["status"] = "success"
    else:
        context["status"] = "denied"
    print(context)
    return flask.jsonify(**context)


@app.route('/api/enrollment', methods=['POST'])
def class_information():
    item = flask.request.json
    id = item['id']
    context = {"class_list":[]}
    conn = sqlite3.connect('../db/var/example.sqlite3')
    cur = conn.cursor()
    cur.execute('select U.classid,C.className,C.sessionName from Enrollment U, Class C where U.userid = ? and U.classid = C.classid',(id,))
    result = cur.fetchall()
    for temp in result:
        dictionary = {"id":temp[0],"className":temp[1],"sessionName":temp[2]}
        context["class_list"].append(dictionary)
    print(context)
    return flask.jsonify(**context)

@app.route('/api/transcript',methods=['POST'])
def transcript_information():
    item = flask.request.json
    class_id = item['classid']
    conn = sqlite3.connect("../db/var/example.sqlite3")
    cur = conn.cursor()
    cur.execute('select T.tid, U.day from cltranscript T, transcript U where T.classid=? and T.tid = U.tid ',(class_id,))
    result = cur.fetchall()
    context = {"transcript_list":[]}
    for temp in result:
        dictionary = {"tid":temp[0],"date":temp[1]}
        context["transcript_list"].append(dictionary)
    print(context)
    return flask.jsonify(**context)


@app.route('/api/lecture',methods=['POST'])
def lecture_information():
    item = flask.request.json
    uid = item['user_id']
    print(uid)
    tids = item['trans_id']
    print(tids)
    conn = sqlite3.connect("../db/var/example.sqlite3")
    cur = conn.cursor()
    cur.execute('select T.media, T.vtt, U.filevtt from transcript T, selftranscript U where T.tid=? and U.userid=? and U.tid=?',(tids,uid,tids,))
    result = cur.fetchone()
    context = {"media":"", 'subtitle':"", 'selfsubtitle':""}
    context["media"] = os.path.abspath('video/' + result[0]+'.mp4')
    context["subtitle"] = os.path.abspath('transcript/' + result[1] + '.vtt')
    context["selfsubtitle"] = os.path.abspath('transcript/' + result[2] + '.vtt')
    print(context)
    return flask.jsonify(**context)

@app.route('/api/vtt',methods=['POST'])
def vtt_information():
    item = flask.request.json
    filepath = item['path']
    conn = sqlite3.connect("../db/var/example.sqlite3")
    cur = conn.cursor()
    cur.execute('select vtt from transcript where tid=?',(filepath,))
    temp = cur.fetchone()[0];
    newpath = os.path.abspath('transcript/' + temp + '.vtt')
    results = helper.read_webvtt(newpath)
    context = {"info": results}
    return flask.jsonify(**context)

@app.route('/api/selfvtt',methods=['POST'])
def selfvtt_information():
    item = flask.request.json
    context = {"info":[]}
    if item['usage'] == 'read':
        uuid = item['user_id']
        ttid = item['trans_id']
        conn = sqlite3.connect("../db/var/example.sqlite3")
        cur = conn.cursor()
        cur.execute('select filevtt from selftranscript where userid =? and tid=?',(uuid,ttid,))
        temp = cur.fetchone()[0]
        newpath = os.path.abspath('transcript/' + temp + '.vtt')
        result = helper.read_webvtt(newpath)
        context["info"] = result
        return flask.jsonify(**context)
    elif item['usage'] == 'write':
        uuid = item['user_id']
        ttid = item['trans_id']
        transcript_list = item['tran']
        conn = sqlite3.connect("../db/var/example.sqlite3")
        cur = conn.cursor()
        cur.execute('select filevtt from selftranscript where userid=? and tid=?',(uuid,ttid,))
        temp = cur.fetchone()[0]
        newpath = os.path.abspath('transcript/'+temp+'.vtt')
        helper.write2vtt(transcript_list,newpath)
    return flask.jsonify(**context)







app.run(debug=True,host='0.0.0.0',port=8000)
