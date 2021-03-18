const listElement = document.getElementById('submit-list')

const requester = new XMLHttpRequest()

requester.open("GET", "https://api-monitoria-fmccii.herokuapp.com/get", true)

requester.send()
requester.onreadystatechange = function () {
  if (requester.readyState == 4 && requester.status == 200) {
    const response = requester.response;

    for (item of JSON.parse(response)) {
      const listItem = document.createElement('li')
      listItem.setAttribute('id', item._id)

      const matricula = document.createElement('span')
      matricula.innerHTML = item.matricula

      const nome = document.createElement('span')
      nome.innerHTML = item.nome

      const contato = document.createElement('span')
      contato.innerHTML = item.contato

      const created_at = document.createElement('span')
      created_at.innerHTML = new Date(item.created_at).toLocaleString()

      listItem.appendChild(matricula)
      listItem.appendChild(nome)
      listItem.appendChild(contato)
      listItem.appendChild(created_at)

      listItem.onclick = () => {
        console.log(listItem.getAttribute('id'));
        window.location.href = '/details'
      }

      listElement.append(listItem)
    }
  } else if (requester.status != 200) {
    window.alert(`Erro na requisição.\nStatusCode: ${requester.status}`)
  }
}
