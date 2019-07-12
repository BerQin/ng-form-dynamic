export class AppJsonClass {

  /**
   * 清洗json
   */
  public clearJson(json: {[key: string]: any}): any {
    const jsonP = {...json};
    for (const key in jsonP) {
      if (key) {
        if (!jsonP[key]) {
          delete jsonP[key];
        }
      }
    }

    return jsonP;
  }
}

export const AppJson = new AppJsonClass();
