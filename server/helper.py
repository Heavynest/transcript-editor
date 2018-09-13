import webvtt
import pycaption

def read_webvtt(filePath):
	results = []
	vtt = open(filePath,'r')
	for line in vtt:
		line = line.strip()
		if line == "WEBVTT":
			continue
		elif line == "":
			continue
		elif is_valid_timestamp(line)[0] == True:
			if is_valid_timestamp(line)[1] == False:
				continue
			start,end = time2number(line)
			dict_temp = {'start': start, 'end': end, 'showing':False,'content': ""}
			results.append(dict_temp)
		else:
			results[-1]["content"] = line
	return results


def is_valid_timestamp(line):
	if len(line) != 29:
		return False,False
	if line[13] != '-' or line[14] != '-' or line[15] != '>':
		return False,False
	if line[13] == '-' and line[14] == '-' and line[15] == '>' and line[17] == 'a':
		return True,False
	return True,True

def time2number(timestamp):
	start = timestamp[0:12]
	end = timestamp[17:29]
	start_num = time2number_helper(start)
	end_num = time2number_helper(end)
	return start_num,end_num


def time2number_helper(time):
	hours = int(time[0])*10 + int(time[1])
	minutes = int(time[3])*10 + int(time[4])
	seconds = int(time[6])*10 + int(time[7])
	millions = int(time[9])*0.1 + int(time[10])*0.01 + int(time[11])*0.001
	return hours*3600 + minutes* 60 + seconds + millions


def write2vtt(dict_list,output_file):
	vtt = webvtt.WebVTT()
	vtt.save(output_file)
	for i in range(len(dict_list)):
		caption = webvtt.Caption(float2string(dict_list[i]["start"]),float2string(dict_list[i]["end"]), [dict_list[i]["content"]])
		vtt.captions.append(caption)

	with open(output_file,'w') as fd:
		vtt.write(fd)

	return


def float2string(num):
	decimal = num - int(num)
	number = num - decimal
	hour = int(number / 3600)
	minutes = int((number - hour*3600)/60)
	seconds = int(number - hour*3600 - minutes*60)
	results = ""
	results += (str(hour) if hour > 9 else ('0' + str(hour))) + ":"
	results += (str(minutes) if minutes > 9 else ('0' + str(minutes))) + ":"
	results += (str(seconds) if seconds > 9 else ('0' + str(seconds))) + "."
	temp = str(round(decimal,3))[2:]
	if len(temp) == 3:
		results += temp
	elif len(temp) == 2:
		temp += "0"
		results += temp
	elif len(temp) == 1:
		temp += "00"
		results += temp
	else:
		temp += "000"
		results += temp

	return results


def test_captions():
	srt_caps = '''1
	00:00:09,209 --> 00:00:12,312
	This is an example SRT file,which, while extremely short,is still a valid SRT file.


	2
	00:00:19,209 --> 00:00:22,312
	This is an example SRT file,which, while extremely short,is still a valid SRT file.
	'''
	converter = pycaption.CaptionConverter()
	converter.read(srt_caps,pycaption.SRTReader())
	print(converter.write(pycaption.WebVTTWriter()))
	#print(converter.write(pycaption.transcript.TranscriptWriter()))


def test_webvtt():
	vtt = webvtt.WebVTT()
	vtt.save('test.vtt')
	caption = webvtt.Caption('00:00:00.500','00:00:07.000',['Caption line 1\nCaption line 2'])
	vtt.captions.append(caption)

	with open('test.vtt','w') as fd:
		vtt.write(fd)


"""
if __name__ == '__main__':
	x = read_webvtt('output.vtt')
	vtt = webvtt.WebVTT()
	vtt.save('test.vtt')
	for i in range(len(x)):
		caption = webvtt.Caption(float2string(x[i]["start"]),float2string(x[i]["end"]), [x[i]["content"]])
		vtt.captions.append(caption)

	with open("test.vtt",'w') as fd:
		vtt.write(fd)
"""
