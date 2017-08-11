// // -----------------------------------------------------------------------------
// // The Firebase SDK is initialized and available here!
//
// firebase.auth().onAuthStateChanged(user => { })
// firebase.database().ref('/path/to/ref').on('value', snapshot => { })
// firebase.messaging().requestPermission().then(() => { })
// firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { })
//
// // -----------------------------------------------------------------------------

/*try {
let app = firebase.app()
let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function')
document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`
} catch (e) {
console.error(e)
document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.'
}*/

let database = firebase.database()

let robotName = 'Nom du robot'//prompt('Nom du robot', 'Nom du robot')
let startDate = new Date()
database.ref('/réalisations/' + robotName + '/début').set(startDate.toString())

database.ref('/process').once('value').then(function (snapshot) {
	var process = snapshot.val()
	var res = '<h2>' + robotName + '</h2>'
	res += '<ol>'
	process.forEach(function (proc) {
		if (typeof proc == 'string') {
			res += '<li><input id="' + proc + '" type="checkbox" onclick="saveProgress(\'' + proc + '\')">' + proc + '</li>'
		} else {
			for (var name in proc) {
				res += '<li>' + name
				res += ' <ol>'
				proc[name].forEach(function (proc1) {
					res += '<li><input id="' + proc1 + '" type="checkbox" onclick="saveProgress(\'' + proc1 + '\')">' + proc1 + '</li>'
				})
				res += '</ol></li>'
			}
		}
	})
	$('#message').text(JSON.stringify(process))
	$('#message').html(res + '</ol>')
})

function saveProgress(step) {
	database.ref('/réalisations/' + robotName + '/étape').set(step)
}
