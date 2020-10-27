import react from 'react';
import reactDOM from 'react-dom';
import axios from 'axios';

import './stylesheet.css';

class App extends react.Component {
    constructor(props) {
        super(props)

        this.state = {
            input: "",
            todos: [{action:"Loading",_id:"loading"}],
        }

        this.submitAction = this.submitAction.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleInput(event) {
        this.setState({
            input: event.target.value
        });
    }

    getTodos() {
        axios.get('/api/todo')
            .then(res => {
                console.log(res.data.length);
                if (res.data.length === 0) {
                    this.setState({
                        todos: [{action:"No Post exist :(",_id:"sad"}]
                    })
                } else {
                    this.setState({
                        todos: res.data
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    submitAction() {
        const action = this.state.input;

        if (action.length > 0) {
            axios.post('/api/todo',{action:action})
            .then(res => {
                if (res.data) {
                    this.getTodos();
                    this.setState({
                        input:""
                    })
                }
            });
        } else {
            console.log("Input Field is required");
        }
    }

    handleDelete(event) {
        const id = event.target.id;
        axios.delete(`/api/todo/${id}`)
        .then(() => this.getTodos())
        .catch((err) => console.log(err));
    }

    componentDidMount() {
        this.getTodos();
        setInterval(() => {
            this.getTodos();
        }, 60000);
    }

    render() {
        console.log(this.state.todos);
        const list = this.state.todos.map((action) => {
            if (action.action === 'Loading' || action.action === "No Post exist :(") {
                return (
                    <li key={action._id}>
                        <p>{action.action}</p>
                    </li>
                )
            } else {
                return (
                    <li key={action._id}>
                        <p className="text">{action.action}</p>
                        <p className="data"><button onClick={this.handleDelete} id={action._id}>Delete</button><span>{action.ip}</span><span>{action.date}</span></p>
                    </li>
                ) 
            }
        });

        return (
            <>
                <h1>Anonymous Posting App</h1>
                <p>Since everyone can add and remove posts please don't spam or do stupid things.</p>
                <p>I created this to learn backend stuffs so don't complain about design</p>
                <p>Your Post get will only live for 2 minutes.</p>
                <div id="input-container">
                    <input onChange={this.handleInput} value={this.state.input} type="text"></input>
                    <button onClick={this.submitAction} >Submit</button>
                    <button onClick={this.getTodos}>Refresh</button>
                </div>
                <div id="list">
                    <ul>
                        {list}
                    </ul>
                </div>
            </>
        );
    }
}

reactDOM.render(<App />, document.getElementById('root'));