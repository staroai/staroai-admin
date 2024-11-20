<script setup lang="ts">
import {
  addSensitiveWords,
  removeSensitiveWords,
  disabledSensitiveWords,
  enableSensitiveWords,
  getSensitiveWords
} from "@/api";

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "SensitiveWordManagement"
});
import { reactive, ref, onMounted, nextTick } from "vue";
import { ElMessage } from "element-plus";

const keyWord = ref("");

const ruleForm = ref(null);

const tableData = ref([]);
const selectedRows = ref([]);

const dialogFormVisible = ref(false);

const form = reactive({
  word: ""
});

const search = (page = 1) => {
  getSensitiveWords({
    keyWord: keyWord.value,
    page,
    limit: 10
  }).then((res: any) => {
    tableData.value = res.words;
    pageCount.value = res.totalPages;
  });
};

const rules = {
  word: [
    {
      required: true,
      message: "请输入敏感词",
      trigger: "blur"
    }
  ]
};

const add = () => {
  form.word = "";
  dialogFormVisible.value = true;
};

const handleSelectionChange = (e: any[]) => {
  // 在这里处理选中的行数据
  selectedRows.value = e;
};

const del = () => {
  if (selectedRows.value.length !== 1) {
    return ElMessage({
      type: "error",
      message: "请选择一条数据"
    });
  }
  removeSensitiveWords({
    word: selectedRows.value[0].word
  }).then((res: any) => {
    ElMessage({
      type: "success",
      message: "删除成功"
    });
    search();
  });
};

const disabled = () => {
  if (selectedRows.value.length !== 1) {
    return ElMessage({
      type: "error",
      message: "请选择一条数据"
    });
  }
  disabledSensitiveWords({
    word: selectedRows.value[0].word
  }).then((res: any) => {
    ElMessage({
      type: "success",
      message: "禁用成功"
    });
    search();
  });
};

const enabled = () => {
  if (selectedRows.value.length !== 1) {
    return ElMessage({
      type: "error",
      message: "请选择一条数据"
    });
  }
  enableSensitiveWords({
    word: selectedRows.value[0].word
  }).then((res: any) => {
    ElMessage({
      type: "success",
      message: "启用成功"
    });
    search();
  });
};

const onsubmit = () => {
  if (!form.word) {
    return ElMessage({
      type: "error",
      message: "请输入敏感词"
    });
  }
  dialogFormVisible.value = false;
  addSensitiveWords({
    word: form.word
  }).then((res: any) => {
    ElMessage({
      type: "success",
      message: "添加成功"
    });
    search();
  });
};

const pageCount = ref(0);
const page = ref(1);
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  page.value = val;
  search(val);
  console.log(`current page: ${val}`);
};

onMounted(() => {
  search();
});
</script>

<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="敏感词">
        <el-input v-model="keyWord" placeholder="请输入敏感词" clearable />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="search()">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="add">添加</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="danger" @click="del">删除</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="disabled">禁用</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="enabled">启用</el-button>
      </el-form-item>
    </el-form>

    <el-table
      height="calc(100vh - 220px)"
      :data="tableData"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="word" label="敏感词" width="" />
      <el-table-column prop="hitCount" label="出现次数" width="" />
      <el-table-column prop="enabled" label="状态" width="">
        <template v-slot="scope">
          {{ scope.row.enabled ? "启用" : "禁用" }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :page-count="pageCount"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />

    <el-dialog v-model="dialogFormVisible" title="添加敏感词" width="500">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item label="敏感词" label-width="80px" prop="word">
          <el-input
            v-model="form.word"
            autocomplete="off"
            clearable
            autofocus
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onsubmit"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}

.el-form--inline .el-form-item {
  margin-right: 15px;
}

.el-pagination {
  float: right;
  margin-top: 10px;
}
</style>
