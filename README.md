lifee
=====

a dynamic web server, never hit refresh again

	npm install lifee


Run lifee on a directory and head over to localhost:9080/{filepath}. You can now add life.js' to the html files you want to bring to life. Next time you save the file or any of its dependant css and javascript, the file will refresh itself in the browser. Never hit refresh again!

If you use sublime you can add this plugin that saves the file on every click

	import sublime, sublime_plugin

	class ModCommand(sublime_plugin.EventListener):
	    def on_modified(self, view):
	    	if view.file_name():
	    		#print view.file_name()
	    		view.run_command('save');