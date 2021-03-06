Views = Ember.Namespace.create();

Views.ModuleView = Ember.View.extend({
  classNames : ['panel', 'panel-default'],
  moduleObj : null,
  expanded : false,
  layout : Ember.Handlebars.compile('' +
    '<div class="panel-heading">' +
      '<h3 class="panel-title">{{title}}</h3>' +
      '<div class="edit-toolbar">' +
        '{{#if view.canEdit}}' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "addData" view.moduleObj}}>{{#tool-tip title="Add Data"}}<span class="glyphicon glyphicon-plus"></span>{{/tool-tip}}</span>' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "editModule" view.moduleObj}}>{{#tool-tip title="Edit Module"}}<span class="glyphicon glyphicon-pencil"></span>{{/tool-tip}}</span>' +
          '{{#if GOTAA.GlobalData.profile.isLeader}}' +
            '<a class="btn btn-link btn-sm btn-edit-toolbar" data-toggle="modal" data-target="#add-user-window" {{action "editModulePermission" view}}>{{#tool-tip title="Assign Members"}}<span class="glyphicon glyphicon-user"></span>{{/tool-tip}}</a>' +
          '{{/if}}' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "deleteModule" view.moduleObj}}>{{#tool-tip title="Delete Module"}}<span class="glyphicon glyphicon-trash"></span>{{/tool-tip}}</span>' +
        '{{/if}}' +
        '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "expandModule" target="view"}}>{{#tool-tip title="Expand Module"}}<span class="glyphicon glyphicon-resize-full"></span>{{/tool-tip}}</span>' +
        '{{#if GOTAA.GlobalData.canEditModule}}' +
          '<br><span class="btn btn-link btn-sm btn-edit-toolbar" {{action "moveLeft" view.moduleObj}}>{{#tool-tip title="Move Left"}}<span class="glyphicon glyphicon-chevron-left"></span>{{/tool-tip}}</span>' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "moveRight" view.moduleObj}}>{{#tool-tip title="Move Right"}}<span class="glyphicon glyphicon-chevron-right"></span>{{/tool-tip}}</span>' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "moveUp" view.moduleObj}}>{{#tool-tip title="Move Up"}}<span class="glyphicon glyphicon-chevron-up"></span>{{/tool-tip}}</span>' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "moveDown" view.moduleObj}}>{{#tool-tip title="Move Down"}}<span class="glyphicon glyphicon-chevron-down"></span>{{/tool-tip}}</span>' +
        '{{/if}}' +
      '</div>' +
    '</div>' +
    '<div class="panel-body">' +
      '{{#if view.expanded}}' +
        '{{create-view view.moduleObj.expandedView moduleObj=view.moduleObj moduleShortView=view title=view.moduleObj.title}}' +
      '{{else}}' +
        '<p>{{view.moduleObj.desc}}</p>' +
        '{{yield}}' +
      '{{/if}}' +
    '</div>'),

  modulePermissions : function() {
    return GOTAA.GlobalData && GOTAA.GlobalData.get("editableModules").filterBy("moduleId", this.get("moduleObj").get("id"));
  }.property("GOTAA.GlobalData.editableModules.@each"),

  canEdit : function() {
    if(GOTAA.GlobalData) {
      var modulePermissions = this.get("modulePermissions"),
          permission = modulePermissions.findBy("user_id", GOTAA.GlobalData.get("profile").get("user_id"));
      return GOTAA.GlobalData.canEditModuleData || !Ember.isEmpty(permission);
    }
    return false;
  }.property("modulePermissions", "GOTAA.GlobalData.profile.user_id"),

  actions : {
    expandModule : function() {
      var moduleObj = this.get("moduleObj");
      GOTAA.endPoint.find = "getFull";
      moduleObj.reload();
      GOTAA.endPoint.find = "get";
      this.set("expanded", true);
    },
  },
});

Views.ModuleSideView = Views.ModuleView.extend({
  layout : Ember.Handlebars.compile('' +
    '<div class="panel-heading">' +
      '<h3 class="panel-title">{{title}}</h3>' +
      '<div class="edit-toolbar">' +
        '{{#if view.canEdit}}' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "addData" view.moduleObj}}>{{#tool-tip title="Add Data"}}<span class="glyphicon glyphicon-plus"></span>{{/tool-tip}}</span>' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "editModule" view.moduleObj}}>{{#tool-tip title="Edit Module"}}<span class="glyphicon glyphicon-pencil"></span>{{/tool-tip}}</span>' +
          '{{#if GOTAA.GlobalData.profile.isLeader}}' +
            '<a class="btn btn-link btn-sm btn-edit-toolbar" data-toggle="modal" data-target="#add-user-window" {{action "editModulePermission" view}}>{{#tool-tip title="Assign Members"}}<span class="glyphicon glyphicon-user"></span>{{/tool-tip}}</a>' +
          '{{/if}}' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "deleteModule" view.moduleObj}}>{{#tool-tip title="Delete Module"}}<span class="glyphicon glyphicon-trash"></span>{{/tool-tip}}</span>' +
        '{{/if}}' +
        '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "expandModule" target="view"}}>{{#tool-tip title="Expand Module"}}<span class="glyphicon glyphicon-resize-full"></span>{{/tool-tip}}</span>' +
        '{{#if GOTAA.GlobalData.canEditModule}}' +
          '<br><span class="btn btn-link btn-sm btn-edit-toolbar" {{action "moveLeft" view.moduleObj}}>{{#tool-tip title="Move Left"}}<span class="glyphicon glyphicon-chevron-left"></span>{{/tool-tip}}</span>' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "moveRight" view.moduleObj}}>{{#tool-tip title="Move Right"}}<span class="glyphicon glyphicon-chevron-right"></span>{{/tool-tip}}</span>' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "moveUp" view.moduleObj}}>{{#tool-tip title="Move Up"}}<span class="glyphicon glyphicon-chevron-up"></span>{{/tool-tip}}</span>' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "moveDown" view.moduleObj}}>{{#tool-tip title="Move Down"}}<span class="glyphicon glyphicon-chevron-down"></span>{{/tool-tip}}</span>' +
        '{{/if}}' +
      '</div>' +
    '</div>' +
    '{{#if view.expanded}}' +
      '{{create-view view.moduleObj.expandedView moduleObj=view.moduleObj moduleShortView=view title=view.moduleObj.title}}' +
    '{{else}}' +
      '<div class="panel-body">' +
        '<p>{{view.moduleObj.desc}}</p>' +
        '<div class="list-group">' +
          '{{#each view.moduleObj.moduleData}}' +
            '<a class="list-group-item module-data">' +
              '{{#if view.canEdit}}' +
                '<div class="edit-toolbar">' +
                  '<span class="btn btn-link btn-edit-toolbar" {{action "editData" this view.moduleObj}}>{{#tool-tip title="Edit Data"}}<span class="glyphicon glyphicon-pencil"></span>{{/tool-tip}}</span>' +
                  '<span class="btn btn-link btn-edit-toolbar" {{action "deleteData" this view.moduleObj}}>{{#tool-tip title="Delete Data"}}<span class="glyphicon glyphicon-trash"></span>{{/tool-tip}}</span>' +
                '</div>' +
              '{{/if}}' +
              '<h4 class="list-group-item-heading">{{title}}</h4>' +
              '{{yield}}' +
            '</a>' +
          '{{else}}' +
            'Empty!' +
          '{{/each}}' +
        '</div>' +
        '{{#unless view.moduleObj.hasAllData}}<button class="btn btn-default btn-sm" {{action "getMore" view.moduleObj target="view"}}>Get More</button>{{/unless}}' +
      '</div>' +
    '{{/if}}'),

  actions : {
    getMore : function(moduleObj) {
      var path = "GOTAA.GlobalData.cursor."+moduleObj.get("id");
      Ember.set(path, moduleObj.get("moduleData").get("length"));
      moduleObj.store.adapterFor("module").findNext(moduleObj, "module", {}).then(function(data) {
        var meta = data.store.metadataFor("module");
        if(meta.cursor === -1) {
          data.set("hasAllData", true);
          data.set("maxLength", data.get("moduleData").get("length"));
        }
      });
    },
  },
});

Views.SimpleListView = Views.ModuleSideView.extend({
  template : Ember.Handlebars.compile('' +
    '<p class="list-group-item-text">{{desc}}</p>'),
});

Views.ListInListView = Views.ModuleSideView.extend({
  template : Ember.Handlebars.compile('' +
    '<p class="list-group-item-text">' +
      '{{#each datalist}}' +
        '<div><div class="col-md-6 col-md-inner col-md-label">{{label}}</div><div class="col-md-6 col-md-inner">{{data}}</div></div>' +
      '{{/each}}' +
      '<div class="clearfix"></div>' +
    '</p>'),
});

Views.ChallengesView = Views.ModuleView.extend({
  template : Ember.Handlebars.compile('' +
    '<div class="list-group">' +
      '{{#with view as moduleView}}' +
        '{{#each moduleView.moduleObj.moduleData}}' +
          '<a class="list-group-item module-data">' +
            '<div class="edit-toolbar">' +
              '{{#if view.canEdit}}' +
                '<span class="btn btn-link btn-edit-toolbar" {{action "editData" this view.moduleObj}}>{{#tool-tip title="Edit Data"}}<span class="glyphicon glyphicon-pencil"></span>{{/tool-tip}}</span>' +
                '<span class="btn btn-link btn-edit-toolbar" {{action "deleteData" this view.moduleObj}}>{{#tool-tip title="Delete Data"}}<span class="glyphicon glyphicon-trash"></span>{{/tool-tip}}</span>' +
              '{{/if}}' +
              '{{#if canMarkEnded}}' +
                '<button class="btn btn-link btn-sm btn-edit-toolbar" data-toggle="modal" data-target="#challenge-ended-window" {{action "markAsEnded" this moduleView.moduleObj}}>{{#tool-tip title="Challenge Ended"}}<span class="glyphicon glyphicon-ok"></span>{{/tool-tip}}</button>' +
              '{{/if}}' +
            '</div>' +
            '<h4 class="list-group-item-heading">{{title}}</h4>' +
            '<p class="list-group-item-text">{{statusString}}</p>' +
          '</a>' +
        '{{else}}' +
          'Empty!' +
        '{{/each}}' +
      '{{/with}}' +
    '</div>'),
});

Views.MemberListView = Views.ModuleSideView.extend({
  layout : Ember.Handlebars.compile('' +
    '<div class="panel-heading">' +
      '<h3 class="panel-title">{{title}}</h3>' +
      '<div class="edit-toolbar">' +
        '{{#if view.canEdit}}' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "addData" view.moduleObj}}>{{#tool-tip title="Add Member"}}<span class="glyphicon glyphicon-plus"></span>{{/tool-tip}}</span>' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "editModule" view.moduleObj}}>{{#tool-tip title="Edit Module"}}<span class="glyphicon glyphicon-pencil"></span>{{/tool-tip}}</span>' +
          '{{#if GOTAA.GlobalData.profile.isLeader}}' +
            '<a class="btn btn-link btn-sm btn-edit-toolbar" data-toggle="modal" data-target="#add-user-window" {{action "editModulePermission" view}}>{{#tool-tip title="Assign Members"}}<span class="glyphicon glyphicon-user"></span>{{/tool-tip}}</a>' +
          '{{/if}}' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "deleteModule" view.moduleObj}}>{{#tool-tip title="Delete Module"}}<span class="glyphicon glyphicon-trash"></span>{{/tool-tip}}</span>' +
        '{{else}}' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "addSelf" view.moduleObj}}>{{#tool-tip title="Add Self"}}<span class="glyphicon glyphicon-plus"></span>{{/tool-tip}}</span>' +
        '{{/if}}' +
        '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "expandModule" target="view"}}>{{#tool-tip title="Expand Module"}}<span class="glyphicon glyphicon-resize-full"></span>{{/tool-tip}}</span>' +
        '{{#if GOTAA.GlobalData.canEditModule}}' +
          '<br><span class="btn btn-link btn-sm btn-edit-toolbar" {{action "moveLeft" view.moduleObj}}>{{#tool-tip title="Move Left"}}<span class="glyphicon glyphicon-chevron-left"></span>{{/tool-tip}}</span>' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "moveRight" view.moduleObj}}>{{#tool-tip title="Move Right"}}<span class="glyphicon glyphicon-chevron-right"></span>{{/tool-tip}}</span>' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "moveUp" view.moduleObj}}>{{#tool-tip title="Move Up"}}<span class="glyphicon glyphicon-chevron-up"></span>{{/tool-tip}}</span>' +
          '<span class="btn btn-link btn-sm btn-edit-toolbar" {{action "moveDown" view.moduleObj}}>{{#tool-tip title="Move Down"}}<span class="glyphicon glyphicon-chevron-down"></span>{{/tool-tip}}</span>' +
        '{{/if}}' +
      '</div>' +
    '</div>' +
    '{{#if view.expanded}}' +
      '{{create-view view.moduleObj.expandedView moduleObj=view.moduleObj moduleShortView=view title=view.moduleObj.title}}' +
    '{{else}}' +
      '<div class="panel-body">' +
        '<p>{{view.moduleObj.desc}}</p>' +
        '<div class="list-group">' +
          '{{#each view.moduleObj.moduleData}}' +
            '<a class="list-group-item module-data">' +
              '<div class="edit-toolbar">' +
                '{{#if view.canEdit}}' +
                  '<span class="btn btn-link btn-edit-toolbar" {{action "editData" this view.moduleObj}}>{{#tool-tip title="Edit Member"}}<span class="glyphicon glyphicon-pencil"></span>{{/tool-tip}}</span>' +
                  '<span class="btn btn-link btn-edit-toolbar" {{action "deleteData" this view.moduleObj}}>{{#tool-tip title="Delete Member"}}<span class="glyphicon glyphicon-trash"></span>{{/tool-tip}}</span>' +
                '{{else}}' +
                  '{{#if isUser}}' +
                    '<span class="btn btn-link btn-edit-toolbar" {{action "editDataSelf" this view.moduleObj}}>{{#tool-tip title="Edit Data"}}<span class="glyphicon glyphicon-pencil"></span>{{/tool-tip}}</span>' +
                    '<span class="btn btn-link btn-edit-toolbar" {{action "deleteData" this view.moduleObj}}>{{#tool-tip title="Remove Self"}}<span class="glyphicon glyphicon-trash"></span>{{/tool-tip}}</span>' +
                  '{{/if}}' +
                '{{/if}}' +
              '</div>' +
              '<h4 class="list-group-item-heading">{{memberObj.name}}</h4>' +
              '<p class="list-group-item-text">{{desc}}</p>' +
            '</a>' +
          '{{else}}' +
            'Empty!' +
          '{{/each}}' +
        '</div>' +
      '</div>' +
    '{{/if}}'),
  template : Ember.Handlebars.compile(''),
  addTooltip : function() {
    var canEdit = this.get("canEdit");
    return (canEdit && "Add Member") || (!canEdit && "Add Self");
  }.property("view.canEdit"),
});

Views.FeedView = Views.ModuleView.extend({
  template : Ember.Handlebars.compile('' +
    '{{#with view as moduleView}}' +
      '{{#view Collapsible.CollapsibleGroup groupId=moduleView.moduleObj.id id=moduleView.moduleObj.id}}' +
        '{{#each moduleView.moduleObj.moduleData}}' +
          '<div class="feed-item">' +
            '{{#view Collapsible.Collapsible title=title groupId=moduleView.moduleObj.id collapseId=id}}' +
              '<p>{{format desc}}</p>' +
              '<img {{bind-attr src="image"}}>' +
            '{{/view}}' +
            '{{#if moduleView.canEdit}}' +
              '<div class="edit-toolbar">' +
                '<span class="btn btn-link btn-edit-toolbar" {{action "editData" this moduleView.moduleObj}}>{{#tool-tip title="Edit Data"}}<span class="glyphicon glyphicon-pencil"></span>{{/tool-tip}}</span>' +
                '<span class="btn btn-link btn-edit-toolbar" {{action "deleteData" this moduleView.moduleObj}}>{{#tool-tip title="Delete Data"}}<span class="glyphicon glyphicon-trash"></span>{{/tool-tip}}</span>' +
              '</div>' +
            '{{/if}}' +
          '</div>' +
        '{{else}}' +
          'Empty!' +
        '{{/each}}' +
      '{{/view}}' +
    '{{/with}}'),

  actions : {
    openImage : function(image) {
      this.set("imageUrl", image);
      $(this.get("windowIdHref")).modal("show");
    },
  },
});

Views.CampTargetView = Views.ModuleSideView.extend({
  template : Ember.Handlebars.compile('' +
    '{{progress-bar maxVal=total val=completedMorphed}}'),
});

Views.PollView = Views.ModuleView.extend({
  init : function() {
    this._super();
  },

  template : Ember.Handlebars.compile('' +
    '{{#with view as moduleView}}' +
      '{{#view Collapsible.CollapsibleGroup groupId=moduleView.moduleObj.id id=moduleView.moduleObj.id}}' +
        '{{#each moduleView.moduleObj.moduleData}}' +
          '<div class="feed-item">' +
            '{{#view Collapsible.Collapsible title=title groupId=moduleView.moduleObj.id collapseId=id}}' +
              '{{#each pollOptions}}' +
                '<div>' +
                  '{{view Ember.Checkbox checked=isVoted}} {{title}}' +
                '</div>' +
              '{{/each}}' +
            '{{/view}}' +
            '{{#if moduleView.canEdit}}' +
              '<div class="edit-toolbar">' +
                '<span class="btn btn-link btn-edit-toolbar" {{action "editData" this moduleView.moduleObj}}>{{#tool-tip title="Edit Data"}}<span class="glyphicon glyphicon-pencil"></span>{{/tool-tip}}</span>' +
                '<span class="btn btn-link btn-edit-toolbar" {{action "deleteData" this moduleView.moduleObj}}>{{#tool-tip title="Delete Data"}}<span class="glyphicon glyphicon-trash"></span>{{/tool-tip}}</span>' +
              '</div>' +
            '{{/if}}' +
          '</div>' +
        '{{else}}' +
          'Empty!' +
        '{{/each}}' +
      '{{/view}}' +
    '{{/with}}'),

  actions : {
    openImage : function(image) {
      this.set("imageUrl", image);
      $(this.get("windowIdHref")).modal("show");
    },
  },
});
