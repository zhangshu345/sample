
importClass(java.io.File);

importClass(java.io.FileInputStream);

importClass(java.io.FileNotFoundException);

importClass(java.io.FileOutputStream);

/**
 * 复制文件夹
 * @神麤詭末
 *p1:原文件夹路径
 *p2:目标文件夹路径
 *flag:
 *falae只复制子文件与子文件夹
 *trut复制自身文件夹与子内容
 */
 function copy(p1,p2,flag){
 f=new File(p1);
 nf=new File(p2);
		if (f.exists()) {
			if (f.isDirectory()) {
				if (flag) {
					nf = new File(nf + "/" + f.getName());
					if (!nf.exists()) {
						nf.mkdirs();
					}
				}
				flag = true;
var l = f.listFiles();
				if (null != l) {
					for ( ll in l) {
  ll=l[ll];
						// 循环递归调用
						copy(ll, nf, flag);
					}
				}
			} else {
				var fis = new FileInputStream(f);
				var fos = new FileOutputStream(nf + "/" + f.getName());
				 b = [1024];
 
while ((len = fis.read()) != -1) {
     fos.write(len);
        }
				fos.close();
				fis.close();

			}
}}