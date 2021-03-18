const urlParams = new URLSearchParams(window.location.search)
const duvida = urlParams.get('duvida')

const requester = new XMLHttpRequest()

requester.open("GET", `https://api-monitoria-fmccii.herokuapp.com/get/${duvida}`, true)

requester.send()
requester.onreadystatechange = function () {
  if (requester.readyState == 4 && requester.status == 200) {
    const { matricula, nome, contato, description, closed } = JSON.parse(requester.response)

    const nameInfo = document.getElementById('name')
    const matriculaInfo = document.getElementById('matricula')
    const contatoInfo = document.getElementById('contact')
    const descriptionInfo = document.getElementById('description')
    const closedInfo = document.getElementById('is-closed')

    nameInfo.children[1].innerHTML = nome
    matriculaInfo.children[1].innerHTML = matricula
    contatoInfo.children[1].innerHTML = contato
    descriptionInfo.children[0].innerHTML = description
    closedInfo.checked = closed

    closedInfo.onclick = () => {
      const requester = new XMLHttpRequest()

      requester.open("POST", `https://api-monitoria-fmccii.herokuapp.com/update/${duvida}`, true)

      requester.send()
      requester.onreadystatechange = function () {
        if (requester.readyState == 4 && requester.status == 200) {
          window.alert('Status mudado com sucesso!')
        } else if (requester.status != 200) {
          window.alert(`Erro ao atualizar status.\nStatusCode: ${requester.status}`)
        }
      }
    }
  }
}