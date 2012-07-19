/**
Burgmobile Version 1.0
8 June 2011

Features:
1. Set-up backbone navigation (if ever there such term exists. :P)
    - Home link List -> article page
    - Burg, Biz, Do It, Arts links
    - Calendar Lists -> Detail Calendar page

**/

Ext.setup({
    onReady : function() {
    
Ext.regModel('ListItem', {
    fields: ['text']
});

var homeData = {
    text: '0',
    items: [
    {
        text: '<center><img width=160 height=160 src="Images/Picture2.png" /></center>',
    },{
        text: '<img style="margin-right: 35px;width:40px; height:40px;" src="Images/smiley1.jpg" /> Happy',
        leaf: true
    },{
        text: '<img style="margin-right: 35px;width:40px; height:40px;" src="Images/smiley2.jpg" /> Tongue-out',
        leaf: true
    },{
        text: '<img style="margin-right: 35px;width:40px; height:40px;" src="Images/smiley3.jpg" /> Unsure',
        leaf: true
    },]
};

var homeStore = new Ext.data.TreeStore({
    model: 'ListItem',
    root: homeData, 
    proxy: {
        type: 'ajax',  
        reader: {
            type: 'tree',
            root: 'items'   
        }
    }
});

var homeNestedList = new Ext.NestedList({
    width: 380,
    height: 400,
    useToolbar: false, 
    title: 'Indexes',
    store: homeStore,
    getDetailCard: function(record, parentRecord){
        homePanel.setActiveItem(contentPanel,{type:'slide',direction:'left'}); 
    }
});

//****************************************************************************************
var calendarData = {
    text: '0',
    items: [{
        text: 'Wednesday, May 18',
    },{
        text: 'Daily Dining Deals',
    },{
        text: 'Today\'s Happy Hour Specials',
    },{
        text: '10:00am Sunken Gardens Hoop Dancing',
        leaf: true
    },{
        text: '11:00am Boyd Hill Nature Preserve: Jungle Boogie',
        leaf: true
    },{
        text: '11:00am Great Explorations: Terrific Tots',
        leaf: true
    },]
};

var calendarStore = new Ext.data.TreeStore({
    model: 'ListItem',
    root: calendarData, 
    proxy: {
        type: 'ajax',  
        reader: {
            type: 'tree',
            root: 'items'   
        }
    }
});

var calendarNestedList = new Ext.NestedList({
    width: 380,
    height: 400,
   // useToolbar: false, // PERFECT!
    title: 'Calendar',
    store: calendarStore,
    listeners: {
        leafitemtap: function(subList,subIdx,el,e,detailCard){
           calendarPanel.setActiveItem(calendarContentPanel,{type:'slide',direction:'left'}); 
           Ext.Msg.alert(null,'tapped leaf', Ext.emptyFn);
           
        }
    },
});

//****************************************************************************************
/** 
    ALL DATA SOURCE ABOVE
**/

var calendarButton = new Ext.Button ({
    cls: 'calendarButton',
    handler: function(){
        tabPanel.setActiveItem(Ext.getCmp('hidden'),{type:'slide',direction:'left'});
    }
    
});

var headerPanel = new Ext.Panel({
    layout: {
        type: 'hbox'
    },
    items: [
    {
        html: '<img width=160 height=80 src="Images/Burgmobile logo.png" />'
    },
    calendarButton
    ]
});

var contentToolbar = new Ext.Toolbar({
    dock : 'top',
    title: 'Burgmobile',
    items: [
		{
			ui:'back',
			text:'Back',
			handler: function () { 
				homePanel.setActiveItem(homeNestedList,{type:'slide',direction:'right'}); 
			}
		}
	]
    
});
var contentPanel = new Ext.Panel({
    dockedItems: [contentToolbar],
    items: [
    {
        html: 'HOME CONTENT HERE'
    }]

});

var homePanel = new Ext.Panel({
    layout: 'card',
    width: 380,
    height: 400,
    items: [homeNestedList,contentPanel]
});
var calendarContentToolbar = new Ext.Toolbar({
    dock : 'top',
    title: 'Calendar',
    items: [
		{
			ui:'back',
			text:'Back',
			handler: function () { 
				calendarPanel.setActiveItem(calendarNestedList,{type:'slide',direction:'right'}); 
			}
		}
	]
    
});
var calendarContentPanel = new Ext.Panel({
    dockedItems: [calendarContentToolbar],
    items: [
    {
        html: 'CALENDAR CONTENT HERE'
    }]

});
var calendarPanel = new Ext.Panel({
    layout: 'card',
    width: 380,
    height: 400,
    items: [calendarNestedList,calendarContentPanel]
});
        
   var tabPanel = new Ext.TabPanel({
            id: 'tabPanel',
            type: 'dark',
            width: 380,
            height: 400,
            items: [{
                title: 'HOME',
                items: [homePanel]
            }, {
                title: 'Burg',
                html: 'Burg',
            }, {
                title: 'Biz',
                html: 'Biz',
            }, {
                title: 'Do It',
                html: 'Do It',
            }, {
                title: 'Arts',
                html: 'Arts',
            },{
                title: 'Hidden',
                id: 'hidden',
                items: [calendarPanel]
            } 
            ],
            listeners: {
                afterrender: function () {
                this.getTabBar().getLayout().getLayoutItems()[5].hide();
            },
            } 
        });
    
   var mainPanel = new Ext.Panel({
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                headerPanel,
                tabPanel
                
                ]
        });
    
}});