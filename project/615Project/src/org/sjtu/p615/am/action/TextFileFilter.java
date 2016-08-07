package org.sjtu.p615.am.action;

import java.io.File;
import java.util.ArrayList;

import javax.swing.filechooser.FileFilter;

public class TextFileFilter extends FileFilter {
	private ArrayList<String> extensions = new ArrayList<String>();
	private ArrayList<String> descriptions = new ArrayList<String>();
	
	public TextFileFilter(){
		super();
	}
	
	public TextFileFilter(String extension, String description) {
		super();
		this.extensions.add(extension);
		this.descriptions.add(description);
	}
	
	@Override
	public boolean accept(File pathname) {
		if (pathname != null) {
			if (pathname.isDirectory()) {
				return true;
			}
			String extension = getExtension(pathname);
			for(int i=0; i<extensions.size(); i++){
				if(extensions.get(i).toLowerCase().endsWith(extension.toLowerCase())){
					return true;
				}
			}
		}
		return false;
	}

	private String getExtension(File pathname) {
		if (pathname != null) {
			String filename = pathname.getName();
			int i = filename.lastIndexOf('.');
			if (i > 0 && i < filename.length() - 1) {
				return filename.substring(i).toLowerCase();
			}
		}
		return null;
	}

	@Override
	public String getDescription() {
		return descriptions.get(descriptions.size()-1);
	}
}
