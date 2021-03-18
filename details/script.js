const urlParams = new URLSearchParams(window.location.search)
const duvida = urlParams.get('duvida')

const requester = new XMLHttpRequest()

requester.open("GET", `https://api-monitoria-fmccii.herokuapp.com/get/${duvida}`, true)

requester.send()
requester.onreadystatechange = function () {
  if (requester.readyState == 4 && requester.status == 200) {
    const { matricula, nome, contato, description } = JSON.parse(requester.response)

    const nameInfo = document.getElementById('name')
    const matriculaInfo = document.getElementById('matricula')
    const contatoInfo = document.getElementById('contact')
    const descriptionInfo = document.getElementById('description')

    nameInfo.children[1].innerHTML = nome
    matriculaInfo.children[1].innerHTML = matricula
    contatoInfo.children[1].innerHTML = contato
    descriptionInfo.children[0].innerHTML = description

  } else if (requester.status != 200) {
    window.alert(`Erro na requisição.\nStatusCode: ${requester.status}`)
  }
}