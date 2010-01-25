function init()
{
	updateDebug();
}

function onSimulationUpdate()
{
	updateDebug();

	updateBuildButton();
}

function updateDebug()
{
	var debug = getGUIObjectByName("debug");
	var simState = Engine.GuiInterfaceCall("GetSimulationState");
	var text = "Simulation:\n" + uneval(simState);
	text += "\n\n";
	for (var ent in g_Selection)
	{
		var entState = Engine.GuiInterfaceCall("GetEntityState", ent);
		text += "Entity "+ent+":\n" + uneval(entState);
		text += "\n\n";
		text += "Template:\n" + uneval(Engine.GuiInterfaceCall("GetTemplateData", entState.template));
	}
	debug.caption = text;
}

function updateBuildButton()
{
	var selection = getEntitySelection();
	if (selection.length)
	{
		var entity = Engine.GuiInterfaceCall("GetEntityState", selection[0]);
		if (entity.buildEntities && entity.buildEntities.length)
		{
			var ent = entity.buildEntities[0];
			var template = Engine.GuiInterfaceCall("GetTemplateData", ent);

			var name;
			if (template.name.specific && template.name.generic)
				name = template.name.specific + " (" + template.name.generic + ")";
			else
				name = template.name.specific || template.name.generic;

			getGUIObjectByName("testBuild").caption = "Construct "+name;
			getGUIObjectByName("testBuild").onpress = function() { testBuild(ent) };
			getGUIObjectByName("testBuild").hidden = false;
			return;
		}
	}
	getGUIObjectByName("testBuild").hidden = true;
}
