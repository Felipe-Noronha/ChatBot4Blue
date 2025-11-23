export class GetHistory {
  constructor(messageApi) {
    this.messageApi = messageApi;
  }

  async execute(user, filters) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let startDate = filters.start_date ? new Date(filters.start_date) : null;
    let endDate = filters.end_date ? new Date(filters.end_date) : null;

    if (startDate) startDate.setHours(0, 0, 0, 0);

    if (startDate && startDate > today) {
      throw new Error("A data inicial não pode ser uma data futura.");
    }
    
    if (endDate) {
      let checkEndDate = new Date(endDate);
      checkEndDate.setHours(0, 0, 0, 0);
      if (checkEndDate > today) {
          throw new Error("A data final não pode ser uma data futura.");
      }
    }
    
    if (startDate && endDate && new Date(endDate) < startDate) {
      throw new Error("A data final não pode ser anterior à data inicial.");
    }
    
    const apiFilters = {};

    if (startDate) {
        apiFilters.start_date = startDate.toISOString().split('T')[0];
    }
    
    if (endDate) {
        let finalEndDate = new Date(endDate);
        finalEndDate.setHours(0, 0, 0, 0); 
        
        finalEndDate.setDate(finalEndDate.getDate() + 1); 
        
        apiFilters.end_date = finalEndDate.toISOString().split('T')[0];
    }

    return await this.messageApi.getHistory(user.id, apiFilters);
  }
}