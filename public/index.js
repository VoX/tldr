var app = document.getElementById('app');
var messageContainer = document.getElementById('messageContainer');

// shitty config
var AppUrl = 'http://localhost:3000/';

function makeFakeData(){
  var fakeMessages = [
    {"message":"test","user":"vox"},
    {"message":"eyyyy, nice api bro","user":"Ryan"},
    {"message":"HEY WHATSUP GUYS. EYY HOWYA DOIN","user":"Benny"},
    {"message":"seriously what the fuck is this","user":"Tyler"},
    {"message":"+1","user":"Ryan"}
    ];

  return fakeMessages;

}

function cleanDate(timestamp){
  var date = new Date(timestamp);
  return date.toDateString();
}


var MessageList = React.createClass({
  render: function() {
    var self = this;
    var createItem = function(item, index) {
      return <li key={index + item} className={item.user == self.props.user ? 'msgContainer msgContainer__user' : 'msgContainer'}><div className="user">{item.user}</div><div className='msg'>{item.message}</div><div className="date">{ cleanDate(item.date) }</div></li>;
    };

    return <ul className="messages">{this.props.items.map(createItem)}</ul>;
  }
});

var ChatChannel = React.createClass({
  getInitialState: function() {
    return {editing: false,
            channel: "public"};
  },
  render: function() {
    var content;
      if(this.state.editing){
        content = <input value={this.state.channel} onChange={this.handleChange}></input>;
      }
      else{
        content = <h3 id="channel">{this.state.channel}</h3>
      }
      return <div id="ChannelContainer">{content}<a href="#" onClick={this.state.editing ? this.updateChannel : this.editChannel}>{this.state.editing ? "Save" : "Edit"}</a></div>;
  },
  updateChannel: function(event){
    this.setState({editing:false});
  },
  handleChange: function(event){
    this.setState({channel: event.target.value.substr(0, 140)});
  },
  editChannel: function(){
    this.setState({editing:true});
  }
});


window.ChatApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: '', channel: 'public', currentUser: 'Ryan'};
  },
  updateMessages: function () {
    $.get(AppUrl + 'channel/' + this.state.channel + '/message', function(response){
        this.setState({items: response});
    }.bind(this));
  },
  componentDidMount: function () {
    this.updateMessages();
  },
  shouldComponentUpdate: function (nextProps, nextState) {
      console.log(nextProps, nextState);
      return true;
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    var msg = {
      message: this.state.text,
      user: this.state.currentUser
    }
    $.post(AppUrl + 'channel/' + this.state.channel + '/message', msg, function(response){
        // this.setState({items: nextItems, text: nextText});
        this.updateMessages();
        this.setState({text: nextText});
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <div className="well">
          <ChatChannel channel={this.state.channel}/>
        </div>
        <div className="well">
          <MessageList items={this.state.items} user={this.state.currentUser} />
        </div>
        <form className="form" onSubmit={this.handleSubmit}>
          <textarea className="form-control" rows="3" onChange={this.onChange} value={this.state.text}></textarea>
          <button className="btn btn-primary pull-right">Send</button>
        </form>
      </div>
    );
  }
});

React.render(<ChatApp />, app);
