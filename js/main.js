// 初始化变量
var audio = null;
var playBtn = null;

// dom加载完毕回调后注册按钮对象
ready(function() {
	playBtn = document.getElementById('playBtn');
});

// 合成按钮
function tts() {
	let text = document.getElementById('text').value;
	let spd = document.getElementById('spd').value;
	let pit = document.getElementById('pit').value;
	let per = document.getElementById('per').value;
	if (text) {
		playBtn.innerText = '准备中';
		$("#ttsBtn").hide();
		$("#playBtn").show();
		$("#cancelBtn").show();
		$("#pauseBtn").show();

		// 调用语音合成接口
		// 参数含义请参考 https://ai.baidu.com/docs#/TTS-API/41ac79a6
		// spd 	选填 	语速，取值0-15，默认为5中语速
		// pit 	选填 	音调，取值0-15，默认为5中语调
		// vol 	选填 	音量，取值0-15，默认为5中音量
		// per（基础音库） 	选填 	度小宇=1，度小美=0，度逍遥=3，度丫丫=4
		// per（精品音库） 	选填 	度博文=106，度小童=110，度小萌=111，度米朵=103，度小娇=5
		audio = btts({
			tex: text,
			tok: '25.9c5ce8215438262719fa19b375147bfa.315360000.1855578061.282335-11760682',
			spd: spd,
			pit: pit,
			vol: 15,
			per: per
		}, {
			volume: 0.3,
			autoplay: true,
			autoDestory: false,
			timeout: 10000,
			hidden: false,
			onInit: function(htmlAudioElement) {

			},
			onSuccess: function(htmlAudioElement) {
				audio = htmlAudioElement;
				playBtn.innerText = '播放';
			},
			onError: function(text) {
				alert(text)
			},
			onTimeout: function() {
				alert('timeout')
			}
		});
	} else {
		alert("请输入待合成文本")
	}
}

// 播放按钮
function play() {
	if (audio === null) {
		alert('请先点击合成')
	} else {
		audio.play();
	}
}

// 暂停按钮
function pause() {
	if (audio === null) {
		alert('请先点击合成')
	} else {
		audio.pause();
	}
}

// 取消按钮
function cancel() {
	if (audio === null) {
		alert('请先点击合成')
	} else {
		audio.pause();
		document.body.removeChild(audio);
		// removeChild(audio);
		audio = null;
		// playBtn.innerText = '准备中';
		$("#playBtn").hide();
		$("#cancelBtn").hide();
		$("#pauseBtn").hide();
		$("#ttsBtn").show();

	}
}

// dom加载完毕回调
function ready(callback) {
	var doc = document;
	if (doc.addEventListener) {
		doc.addEventListener('DOMContentLoaded', function() {
			callback();
		}, false);
	} else if (doc.attachEvent) {
		doc.attachEvent('onreadystatechange', function() {
			if (doc.readyState === 'complete') {
				callback();
			}
		});
	}
}
