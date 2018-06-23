function radio(ele)
	{
	fobj = "document.folderform.";
	obj = eval(fobj+ele);
	for (i=0 ; i<obj.length ; i++)
		{
		if (obj[i].checked)
			{
			if (ele == "unit")
				{
				flag(i);
				}
			imgind();
			break;
			}
		}
	}

function imgind()
	{
	if (check2() == 3)
		{
		var urllist = check('chack')+check('unit')+check('folder');
		document.stmimg.src = "/images/holder/stm"+urllist+".gif";
		text1(urllist);
		return urllist;
		}else{
		document.stmimg.src = "/images/d.gif";
		document.folderform.t1.value = "";
		document.folderform.t2.value = "";
		return false;
		};
	}

function text1(url)
	{
	var array =
		{
		"e00u":"STM-E00-U",
		"e00v":"STM-E00-V",
		"e05eyc16":"STM-E05-EYC16",
		"e05eyc25":"STM-E05-EYC25",
		"e05eyc32":"STM-E05-EYC32",
		"e05u":"STM-E05-U",
		"e05v":"STM-E05-V",
		"e10eyc16":"STM-E10-EYC16",
		"e10eyc25":"STM-E10-EYC25",
		"e10eyc32":"STM-E10-EYC32 *1",
		"e10u":"STM-E10-U",
		"e10v":"STM-E10-V",
		"r00u":"STM-R00-U",
		"r00v":"STM-R00-V",
		"r05eyc16":"STM-R05-EYC16",
		"r05eyc25":"STM-R05-EYC25",
		"r05eyc32":"STM-R05-EYC32",
		"r05u":"STM-R05-U",
		"r05v":"STM-R05-V",
		"r10eyc16":"STM-R10-EYC16",
		"r10eyc25":"STM-R10-EYC25",
		"r10eyc32":"STM-R10-EYC32 *1",
		"r10u":"STM-R10-U",
		"r10v":"STM-R10-V"
		}
	var array2 =
		{
		"e00u":"\\171\,000",
		"e00v":"\\171\,000",
		"e05eyc16":"\\190\,000",
		"e05eyc25":"\\0",
		"e05eyc32":"\\0",
		"e05u":"\\143\,000",
		"e05v":"\\143\,000",
		"e10eyc16":"\\209\,000",
		"e10eyc25":"\\220\,000",
		"e10eyc32":"\\257\,400",
		"e10u":"\\150\,000",
		"e10v":"\\150\,000",
		"r00u":"\\155\,000",
		"r00v":"\\155\,000",
		"r05eyc16":"\\190\,000",
		"r05eyc25":"\\0",
		"r05eyc32":"\\0",
		"r05u":"\\143\,000",
		"r05v":"\\143\,000",
		"r10eyc16":"\\209\,000",
		"r10eyc25":"\\220\,000",
		"r10eyc32":"\\257\,400",
		"r10u":"\\150\,000",
		"r10v":"\\150\,000"
		}
	document.folderform.t1.value = array[url];
	document.folderform.t2.value = array2[url];
	}

function check(ele)
	{
	fobj = eval("document.folderform."+ele);
	for (i=0 ; i<fobj.length ; i++)
		{
		if (fobj[i].checked)
			{
			return fobj[i].value;
			}
		}
	}

function check2()
	{
	var fobj = "document.folderform.";
	var obj1 = eval(fobj + "unit");
	var obj2 = eval(fobj + "chack");
	var obj3 = eval(fobj + "folder");
	var chkflag1 = 0;
	var chkflag2 = 0;
	var chkflag3 = 0;
	for (i=0 ; i<obj1.length ; i++)
		{
		if (obj1[i].checked)
			{
			chkflag1 = 1;
			}
		}
	for (i=0 ; i<obj2.length ; i++)
		{
		if (obj2[i].checked)
			{
			chkflag2 = 1;
			}
		}
	for (i=0 ; i<obj3.length ; i++)
		{
		if (obj3[i].checked)
			{
			chkflag3 = 1;
			}
		}
	return chkflag1+chkflag2+chkflag3;
	}

function flag(fl)
	{
	fobj = document.folderform;

	switch(fl)
		{
		case 0:
		checktrue = new Array(0,1);
		checkfalse = new Array(2,3,4);
		break;

		case 1:
		checktrue = new Array(0,1);
		checkfalse = new Array(2,3,4);
		break;

		case 2:
		checktrue = new Array(1);
		checktrue[0] = 2;
		checkfalse = new Array(0,1,3,4);
		break;

		case 3:
		checktrue = new Array(0,1);
		checkfalse = new Array(2,3,4);
		break;

		case 4:
		checktrue = new Array(2,3,4);
		checkfalse = new Array(0,1);
		break;

		default:
		alert("errer");
		break;
		}

	for (i=0 ; i<checkfalse.length ; i++)
		{
		var j = checkfalse[i];
		fobj.folder[j].disabled = true;
		fobj.folder[j].checked = false;
		}

	for (i=0 ; i<checktrue.length ; i++)
		{
		var j = checktrue[i];
		fobj.folder[j].disabled = false;
		}

	}

function def()
	{
	fobj = document.folderform;
	for (i=0 ; i<fobj.unit.length ; i++)
		{
		fobj.unit[i].checked = false;
		}
	for (i=0 ; i<fobj.chack.length ; i++)
		{
		fobj.chack[i].checked = false;
		}
	for (i=0 ; i<fobj.folder.length ; i++)
		{
		fobj.folder[i].disabled = true;
		fobj.folder[i].checked = false;
		}
	document.stmimg.src = "/images/d.gif";
	document.folderform.t1.value = "";
	document.folderform.t2.value = "";
	}
