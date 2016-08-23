var React = require('react');
var ReactDOM = require('react-dom');

//Call sample data from a local source
var samples = require('./sample-data');

var App = React.createClass({
  //tells app what the initial state is. Create empty state object
  getInitialState: function(){
    return {
      "humans": {},
      "stores": {},
      "selectedConversation": []
    }
  },
  loadSampleData: function(){
    this.setState(samples);
  },
  setSelectedConversation: function(human_index){
    this.setState({
      selectedConversation: this.state.humans[human_index].conversations
    });
  },
  render : function() {
    return (
      <div>
        <div id="header"></div>
        <button onClick={this.loadSampleData}>Load Sample Data</button>
        <div className="container">
          <div className="column">
            <InboxPane humans={this.state.humans} setSelectedConversation={this.setSelectedConversation} />
          </div>
          <div className="column">
            <ConversationPane conversation={this.state.selectedConversation}/>
          </div>
          <div className="column"></div>
        </div>
      </div>
    )
  }
});

var InboxPane = React.createClass({
  renderInboxItem: function(human){
    return <InboxItem key={human} index={human} details={this.props.humans[human]} setSelectedConversation={this.props.setSelectedConversation} />;
  },
  render : function() {
    return (
      <div id="inbox-pane">
        <h1>Inbox</h1>
        <table>
          <thead>
            <tr>
              <th>Chat Received</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.humans).map(this.renderInboxItem)}
          </tbody>
        </table>
      </div>
    )
  }
});

var InboxItem = React.createClass({
  sortByDate: function(a,b) {
    return a.time>b.time ? -1 : a.time<b.time ? 1:0;
  },
  messageSummary: function(conversations){
    var lastMessage = conversations.sort(this.sortByDate)[0];
    return lastMessage.who + ' said: "' + lastMessage.text + '" @ ' + lastMessage.time.toDateString();
  },
  setSelected: function(){
    this.props.setSelectedConversation(this.props.index);
  },
  render: function(){
    return (
      <tr>
        <td><a onClick={this.setSelected}>{this.messageSummary(this.props.details.conversations)}</a></td>
        <td>{this.props.index}</td>
        <td>{this.props.details.orders.sort(this.sortByDate)[0].status}</td>
      </tr>
    )
  }
});

var ConversationPane = React.createClass({
  renderMessage: function(val){
    return <Message who={val.who} text={val.text} key={val.time.getTime()} />
  },
  render: function(){
    return (
      <div id="conversation-pane">
        <h1>Conversation</h1>
        <h3>Select a conversation from the inbox</h3>
        <div id="messages">
          {this.props.conversation.map(this.renderMessage)}
        </div>
      </div>
    )
  }
});

var Message = React.createClass({
  render: function(){
    return <p>{this.props.who} said: "{this.props.text}"</p>;
  }
});

ReactDOM.render(<App/>, document.getElementById('main'));
