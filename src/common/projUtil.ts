import { fileUtil } from 'utils-ok';

const path = require('path');
const shell = require('shelljs');

/**
 * 仅本工程使用
 */
export class ProjUtil {
  /**
   * 执行bin
   * @param cmd
   * @param async
   * @param silent
   */
  static bin(cmd: string, async?: boolean, silent?: boolean) {
    shell.exec(`${this.getModulesPath()}/.bin/${cmd}`, { async, silent });
  }

  static getResourcePath(): string {
    return path.resolve(__dirname, '../resource');
  }

  static getProjPath(): string {
    return path.resolve(__dirname, '../');
  }

  /**
   * 获取根项目路径(首个node_modules/本工程)
   */
  static getRootProjPath(): string {
    const tarpath = __dirname;
    if (tarpath.indexOf('/node_modules') > 0) {
      return tarpath.substr(0, tarpath.indexOf('/node_modules'));
    }
    return this.getProjPath();
  }

  static getTestPath(): string {
    return path.resolve(__dirname, '../test');
  }

  // 兼容module中使用，判断路径是否包含dist
  static getModulesPath(): string {
    if (__dirname.includes('/dist/')) {
      return path.resolve(__dirname, '../../node_modules');
    }
    return path.resolve(__dirname, '../node_modules');

  }

  /**
   * 清空本工程的临时文件
   */
  static cleanTemp() {
    fileUtil.cleanDir(`${this.getResourcePath()}/temp`);
  }
}
