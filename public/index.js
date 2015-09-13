var app = document.getElementById('app');
var messageContainer = document.getElementById('messageContainer');


var MessageList = React.createClass({
  render: function() {
    var createItem = function(itemText, index) {
      return <li key={index + itemText} className="msgContainer"><div className="msg">{itemText}</div></li>;
    };

    return <ul className="messages">{this.props.items.map(createItem)}</ul>;
  }
});

var ChatTitle = React.createClass({
  getInitialState: function() {
    return {editing: false,
            channel: "public"};
  },
  render: function() {  
    var content;
    console.log("wtf");
      if(this.state.editing){
        content = <input value={this.state.channel} onChange={this.handleChange}></input>;
      }
      else{
        content = <h3 id="channel">{this.state.channel}</h3>
      }
      return <div id="titleContainer">{content}<a href="#" onClick={this.state.editing ? this.updateTitle : this.editTitle}>{this.state.editing ? "Save" : "Edit"}</a></div>;
  },
  updateTitle: function(event){
    this.setState({editing:false});
  },
    handleChange: function(event){
    this.setState({channel: event.target.value.substr(0, 140)});
  },
  editTitle: function(){
    this.setState({editing:true});
  }

});


window.ChatApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: '', title: 'tl;dr butts and stuff'};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <div className="well">
          <ChatTitle title={this.state.title}/>
        </div>
        <div className="well">
          <MessageList items={this.state.items} />
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
