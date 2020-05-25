const baseUrl = "https://wincacademydatabase.firebaseio.com"
const firstName = "Natalie";

const getAllTasks = async () => {
    const apiUrl = `${baseUrl}/${firstName}/tasks.json`;
    try {
        const result = await fetch(apiUrl, {method: 'GET'});    
        const jsondata = await result.json();    
        return jsondata;
    } catch (error) {console.log(error)}
}

const postNewTask = async (data = {}) => {
    const apiUrl = `${baseUrl}/${firstName}/tasks.json`;
    const response = await fetch(apiUrl, {
      method: 'POST', 
      body: JSON.stringify(data)
    });
    return response.json();
  };

  const updateTask = async (hashId, data = {}) => {
    const apiUrl = `${baseUrl}/${firstName}/tasks/${hashId}.json`;
    const response = await fetch(apiUrl, {
      method: 'PUT', 
      body: JSON.stringify(data)
    });
    return response.json();
  };

  const deleteTask = async (hashId) => {
    const apiUrl = `${baseUrl}/${firstName}/tasks/${hashId}.json`;
    const response = await fetch(apiUrl, {method: 'DELETE'});
    return response.json();
  }
  
